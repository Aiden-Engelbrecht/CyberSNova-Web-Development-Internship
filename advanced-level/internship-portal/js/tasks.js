document.addEventListener("DOMContentLoaded", () => {
    const tasksContainer = document.getElementById("tasks-container");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const domainTitle = document.getElementById("domain-title");
    const domainDesc = document.getElementById("domain-desc");

    const urlParams = new URLSearchParams(window.location.search);
    const domainParam = urlParams.get("domain") || "web-development";

    // Completely unique task lists per domain
    const allTasks = {
        "web-development": [
            {
                level: "beginner",
                title: "Responsive Landing Page",
                description: "Build a modern landing page for a fictional SaaS product. Focus on clean layout, typography, and mobile responsiveness using CSS Flexbox or Grid.",
                requirements: "HTML5, CSS3, Media Queries"
            },
            {
                level: "intermediate",
                title: "Full-Stack E-Commerce Store",
                description: "Create an online store with product filtering, a shopping cart, and a simulated checkout process.",
                requirements: "React/Vue, Node.js, REST APIs"
            },
            {
                level: "advanced",
                title: "Real-Time Chat Application",
                description: "Develop a real-time messaging app with user authentication, multiple chat rooms, and WebSocket integration.",
                requirements: "Socket.io, Express, MongoDB, JWT Auth"
            }
        ],
        "data-science": [
            {
                level: "beginner",
                title: "Data Cleaning & EDA",
                description: "Given a raw CSV dataset of housing prices, write a Python script to handle missing values, remove outliers, and generate a correlation matrix.",
                requirements: "Python, Pandas, Seaborn"
            },
            {
                level: "intermediate",
                title: "Customer Churn Prediction",
                description: "Build a machine learning model to predict which telecom customers are likely to cancel their subscriptions.",
                requirements: "Scikit-Learn, XGBoost, Feature Engineering"
            },
            {
                level: "advanced",
                title: "Deep Learning Image Classifier",
                description: "Train a Convolutional Neural Network (CNN) to classify images of clothing from the Fashion-MNIST dataset.",
                requirements: "TensorFlow/PyTorch, CNNs, Matplotlib"
            }
        ],
        "cybersecurity": [
            {
                level: "beginner",
                title: "Vulnerability Audit Report",
                description: "Perform a basic vulnerability scan on a simulated web environment. Document your findings and propose mitigations based on OWASP Top 10.",
                requirements: "OWASP Framework, Technical Writing"
            },
            {
                level: "intermediate",
                title: "Secure Authentication System",
                description: "Build a login and registration system that securely stores passwords using bcrypt and prevents SQL injection attacks.",
                requirements: "Node.js/PHP, SQL, Password Hashing"
            },
            {
                level: "advanced",
                title: "Network Packet Analyser",
                description: "Write a Python script that sniffs network traffic and identifies suspicious unencrypted protocols (like HTTP or Telnet).",
                requirements: "Python, Scapy, Network Protocols"
            }
        ],
        "ui-ux-design": [
            {
                level: "beginner",
                title: "Mobile App Wireframes",
                description: "Create low-fidelity wireframes for a food delivery app. Focus on user flow from login to checkout.",
                requirements: "Figma, Wireframing principles"
            },
            {
                level: "intermediate",
                title: "Design System & Component Library",
                description: "Build a reusable design system with typography scales, color palettes, and UI components (buttons, inputs, cards).",
                requirements: "Figma, Auto-layout, Variables"
            }
        ],
        "cloud-computing": [
            {
                level: "intermediate",
                title: "Dockerized Web Server",
                description: "Containerise a simple Node.js web server using Docker. Create a Dockerfile and expose the app on a specific port.",
                requirements: "Docker, Linux CLI"
            },
            {
                level: "advanced",
                title: "CI/CD Pipeline Deployment",
                description: "Set up a GitHub Actions workflow that automatically runs tests and deploys a static site to AWS S3 upon merging to main.",
                requirements: "GitHub Actions, AWS S3, YAML"
            }
        ]
    };

    const defaultTasks = allTasks["web-development"];
    const currentTasks = allTasks[domainParam] || defaultTasks;

    function formatTitle(id) {
        return id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
    
    domainTitle.textContent = `${formatTitle(domainParam)} Tasks`;
    domainDesc.textContent = `Complete the required tasks below to pass the ${formatTitle(domainParam)} track.`;

    function renderTasks(filterLevel = "all") {
        tasksContainer.innerHTML = "";

        const filteredTasks = filterLevel === "all" 
            ? currentTasks 
            : currentTasks.filter(t => t.level === filterLevel);

        if (filteredTasks.length === 0) {
            tasksContainer.innerHTML = `<p style="padding: 2rem; border: 1px dashed var(--line); text-align: center; color: var(--ink-muted);">No tasks available for this level yet.</p>`;
            return;
        }

        filteredTasks.forEach(task => {
            const card = document.createElement("div");
            card.style.cssText = "background: var(--surface); border: 1px solid var(--line); padding: 2rem; border-radius: var(--radius-sm); border-left: 4px solid var(--accent);";
            
            // Color code the level badge
            let badgeColor = "var(--ink)";
            if (task.level === "beginner") badgeColor = "#16a34a";
            if (task.level === "intermediate") badgeColor = "#eab308";
            if (task.level === "advanced") badgeColor = "#dc2626";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="font-family: var(--font-display); font-size: 1.5rem;">${task.title}</h3>
                    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #fff; background: ${badgeColor}; padding: 0.25rem 0.75rem; border-radius: 999px;">${task.level}</span>
                </div>
                <p style="color: var(--ink-soft); margin-bottom: 1.5rem; font-size: 1rem;">${task.description}</p>
                <div style="border-top: 1px solid var(--line); padding-top: 1rem;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.05em;">Tech Stack: </span>
                    <span style="font-size: 0.875rem; font-weight: 600; color: var(--ink);">${task.requirements}</span>
                </div>
            `;
            tasksContainer.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            renderTasks(btn.dataset.level);
        });
    });

    renderTasks();
});