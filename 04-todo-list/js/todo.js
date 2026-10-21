document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskListContainer = document.getElementById("task-list-container");
    const emptyState = document.getElementById("empty-state");

    // Views & Controls
    const viewButtons = document.querySelectorAll(".view-button");
    const filterButtons = document.querySelectorAll(".filter-button");
    const calendarContainer = document.getElementById("calendar-container");
    const clearCompletedBtn = document.getElementById("clear-completed");
    const deleteAllBtn = document.getElementById("delete-all");

    // Calendar Elements
    const calendarMonthYear = document.getElementById("calendar-month-year");
    const calendarGrid = document.getElementById("calendar-grid");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    
    // Popover Elements
    const calendarPopover = document.getElementById("calendar-popover");
    const popoverDateTitle = document.getElementById("popover-date-title");
    const popoverTaskList = document.getElementById("popover-task-list");
    const closePopoverBtn = document.getElementById("close-popover");

    // Modal Elements
    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-form");
    const editInput = document.getElementById("edit-task-input");
    const editDate = document.getElementById("edit-task-date");
    const closeModalBtn = document.getElementById("close-modal");
    const cancelEditBtn = document.getElementById("cancel-edit");

    // Toast & Counts
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    const remainingCount = document.getElementById("remaining-count");

    // State
    let tasks = JSON.parse(sessionStorage.getItem("daymark-tasks")) || [];
    let currentFilter = "all";
    let currentView = "list";
    let taskToEdit = null;
    let collapsedGroups = JSON.parse(sessionStorage.getItem("daymark-collapsed")) || {};
    let currentCalDate = new Date(); 
    let activePopoverDate = null;

    // Date setup
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    taskDate.value = todayString;

    // --- Utility ---
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    function saveTasks() {
        sessionStorage.setItem("daymark-tasks", JSON.stringify(tasks));
        renderTasks();
    }

    // --- Rendering ---
    function renderTasks() {
        const active = tasks.filter(t => !t.completed).length;
        remainingCount.textContent = active;
        clearCompletedBtn.disabled = (tasks.length - active) === 0;
        deleteAllBtn.disabled = tasks.length === 0;

        if (currentView === "list") {
            renderListView();
            calendarContainer.style.display = "none";
            taskListContainer.style.display = "block";
        } else {
            renderCalendarView();
            taskListContainer.style.display = "none";
            calendarContainer.style.display = "block";
        }
    }

    function renderListView() {
        taskListContainer.innerHTML = "";
        let filtered = tasks;
        if (currentFilter === "active") filtered = tasks.filter(t => !t.completed);
        if (currentFilter === "completed") filtered = tasks.filter(t => t.completed);

        if (filtered.length === 0) {
            emptyState.classList.add("visible");
            return;
        }
        emptyState.classList.remove("visible");

        const grouped = {};
        filtered.forEach(task => {
            const key = task.date || "No Date";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(task);
        });

        const sortedDates = Object.keys(grouped).sort((a, b) => {
            if (a === "No Date") return 1;
            if (b === "No Date") return -1;
            return new Date(a) - new Date(b);
        });

        sortedDates.forEach(dateKey => {
            const isCollapsed = collapsedGroups[dateKey] || false;
            let headerText = dateKey === todayString ? "Today" : new Date(dateKey).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
            if (dateKey === "No Date") headerText = "No Date";

            const div = document.createElement("div");
            div.className = `task-group ${isCollapsed ? "is-collapsed" : ""}`;

            const header = document.createElement("div");
            header.className = "task-group-header";
            header.innerHTML = `<span>${headerText} (${grouped[dateKey].length})</span> <span class="group-toggle-icon">▼</span>`;
            header.addEventListener("click", () => {
                collapsedGroups[dateKey] = !collapsedGroups[dateKey];
                sessionStorage.setItem("daymark-collapsed", JSON.stringify(collapsedGroups));
                renderTasks();
            });

            const ul = document.createElement("ul");
            ul.className = "task-list";
            grouped[dateKey].forEach(task => ul.appendChild(createTaskElement(task)));
            
            div.appendChild(header);
            div.appendChild(ul);
            taskListContainer.appendChild(div);
        });
    }

    function renderCalendarView() {
        emptyState.classList.remove("visible");
        const year = currentCalDate.getFullYear();
        const month = currentCalDate.getMonth();

        calendarMonthYear.textContent = currentCalDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
        calendarGrid.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            const div = document.createElement("div");
            div.className = "calendar-day is-other-month";
            div.textContent = prevMonthDays - i;
            calendarGrid.appendChild(div);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const div = document.createElement("div");
            div.className = "calendar-day";
            div.textContent = i;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            
            if (dateStr === todayString) div.classList.add("is-today");
            if (tasks.some(t => t.date === dateStr)) div.classList.add("has-tasks");

            div.addEventListener("click", () => openPopover(dateStr, div));
            calendarGrid.appendChild(div);
        }
    }

    // --- Popover Logic ---
    function openPopover(dateStr, anchorEl) {
        activePopoverDate = dateStr;
        const dayTasks = tasks.filter(t => t.date === dateStr);
        
        popoverDateTitle.textContent = new Date(dateStr).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
        popoverTaskList.innerHTML = "";

        if (dayTasks.length === 0) {
            popoverTaskList.innerHTML = `<li style="font-size:0.75rem; color:var(--ink-muted); padding:0.5rem;">No tasks for this day.</li>`;
        } else {
            dayTasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "popover-task-item";
                li.innerHTML = `
                    <span style="${task.completed ? 'text-decoration:line-through; color:var(--ink-muted);' : ''}">${task.text}</span>
                    <div class="popover-actions">
                        <button class="action-btn edit-btn">✎</button>
                        <button class="action-btn delete-btn">✕</button>
                    </div>
                `;
                li.querySelector(".edit-btn").addEventListener("click", () => { closePopover(); openEditModal(task); });
                li.querySelector(".delete-btn").addEventListener("click", () => { deleteTask(task.id); openPopover(dateStr); });
                popoverTaskList.appendChild(li);
            });
        }

        calendarPopover.classList.add("is-open");
    }

    function closePopover() {
        calendarPopover.classList.remove("is-open");
        activePopoverDate = null;
    }

    // --- Task Helpers ---
    function createTaskElement(task) {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="action-btn edit-btn">✎</button>
                <button class="action-btn delete-btn">✕</button>
            </div>
        `;
        li.querySelector(".task-checkbox").addEventListener("change", () => toggleTask(task.id));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
        li.querySelector(".edit-btn").addEventListener("click", () => openEditModal(task));
        return li;
    }

    function addTask(text, date) {
        tasks.push({ id: Date.now().toString(), text, date, completed: false });
        saveTasks();
        taskInput.value = "";
        taskDate.value = todayString;
        showToast("Task added");
    }

    function toggleTask(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks();
        if (activePopoverDate) openPopover(activePopoverDate); // Refresh popover if open
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        showToast("Task deleted");
    }

    function openEditModal(task) {
        taskToEdit = task;
        editInput.value = task.text;
        editDate.value = task.date || "";
        editModal.classList.add("is-open");
    }

    // --- Event Listeners ---
    prevMonthBtn.addEventListener("click", () => { currentCalDate.setMonth(currentCalDate.getMonth() - 1); renderCalendarView(); });
    nextMonthBtn.addEventListener("click", () => { currentCalDate.setMonth(currentCalDate.getMonth() + 1); renderCalendarView(); });
    closePopoverBtn.addEventListener("click", closePopover);

    viewButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            viewButtons.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            currentView = btn.dataset.view;
            closePopover();
            renderTasks();
        });
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;
        addTask(text, taskDate.value);
    });

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newText = editInput.value.trim();
        if (!newText) return;
        tasks = tasks.map(t => t.id === taskToEdit.id ? { ...t, text: newText, date: editDate.value } : t);
        saveTasks();
        editModal.classList.remove("is-open");
        showToast("Task updated");
    });

    closeModalBtn.addEventListener("click", () => editModal.classList.remove("is-open"));
    cancelEditBtn.addEventListener("click", () => editModal.classList.remove("is-open"));
    editModal.addEventListener("click", (e) => { if (e.target === editModal) editModal.classList.remove("is-open"); });

    clearCompletedBtn.addEventListener("click", () => { tasks = tasks.filter(t => !t.completed); saveTasks(); showToast("Cleared completed"); });
    deleteAllBtn.addEventListener("click", () => { if (confirm("Delete all tasks?")) { tasks = []; saveTasks(); } });

    renderTasks();
});