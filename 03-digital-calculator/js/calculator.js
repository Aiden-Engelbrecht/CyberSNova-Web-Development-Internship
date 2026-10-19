document.addEventListener("DOMContentLoaded", () => {
    const expressionEl = document.getElementById("expression");
    const resultEl = document.getElementById("result");
    const keypad = document.querySelector(".keypad");
    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history");
    
    const appContainer = document.getElementById("app-container");
    const toggleHistoryBtn = document.getElementById("toggle-history");
    const historyBtnText = document.getElementById("history-btn-text");

    let currentInput = "0";
    let previousInput = "";
    let currentOperator = null;
    let shouldResetScreen = false;
    
    let history = JSON.parse(sessionStorage.getItem("calc-history")) || [];

    function formatNumber(num) {
        if (num === "Error") return num;
        const parts = num.split(".");
        const integerPart = parts[0];
        const decimalPart = parts[1];
        const formattedInteger = parseInt(integerPart, 10).toLocaleString("en-ZA");
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    }

    function updateDisplay() {
        resultEl.textContent = formatNumber(currentInput);
        if (currentOperator !== null) {
            const opSymbol = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" }[currentOperator];
            expressionEl.textContent = `${formatNumber(previousInput)} ${opSymbol}`;
        }
    }

    function renderHistory() {
        historyList.innerHTML = "";
        if (history.length === 0) {
            historyList.innerHTML = '<li class="history-empty">No calculations yet.</li>';
            return;
        }

        history.forEach((item) => {
            const li = document.createElement("li");
            li.className = "history-item";
            li.innerHTML = `
                <span class="history-expression">${item.expression}</span>
                <span class="history-result">= ${item.result}</span>
            `;
            li.addEventListener("click", () => {
                currentInput = item.result.replace(/,/g, "");
                currentOperator = null;
                previousInput = "";
                shouldResetScreen = false;
                expressionEl.textContent = "";
                updateDisplay();
                
                if (window.innerWidth <= 768 && appContainer.classList.contains("history-open")) {
                    toggleHistory();
                }
            });
            historyList.appendChild(li);
        });
    }

    function saveHistory(expression, result) {
        history.unshift({ expression, result });
        if (history.length > 10) history.pop(); 
        sessionStorage.setItem("calc-history", JSON.stringify(history));
        renderHistory();
    }

    function appendNumber(number) {
        if (currentInput === "0" || shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (shouldResetScreen) {
            currentInput = "0.";
            shouldResetScreen = false;
        } else if (!currentInput.includes(".")) {
            currentInput += ".";
        }
        updateDisplay();
    }

    function handleOperator(operator) {
        if (currentOperator !== null && !shouldResetScreen) {
            calculate();
        }
        previousInput = currentInput;
        currentOperator = operator;
        shouldResetScreen = true;
        updateDisplay();
    }

    function calculate() {
        if (currentOperator === null || shouldResetScreen) return;

        const prev = parseFloat(previousInput.replace(/,/g, ""));
        const current = parseFloat(currentInput.replace(/,/g, ""));
        let result = 0;
        let expressionString = "";

        const opSymbol = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" }[currentOperator];

        switch (currentOperator) {
            case "+": result = prev + current; break;
            case "-": result = prev - current; break;
            case "*": result = prev * current; break;
            case "/": 
                if (current === 0) {
                    currentInput = "Error";
                    currentOperator = null;
                    shouldResetScreen = true;
                    expressionEl.textContent = "";
                    updateDisplay();
                    return;
                }
                result = prev / current; 
                break;
            case "%": result = prev % current; break;
        }

        result = Math.round(result * 100000000) / 100000000;
        expressionString = `${formatNumber(previousInput)} ${opSymbol} ${formatNumber(currentInput)}`;
        
        currentInput = result.toString();
        currentOperator = null;
        previousInput = "";
        shouldResetScreen = true;
        expressionEl.textContent = "";
        
        updateDisplay();
        saveHistory(expressionString, formatNumber(currentInput));
    }

    function deleteNumber() {
        if (currentInput === "Error") {
            currentInput = "0";
        } else if (currentInput.length === 1 || currentInput === "0") {
            currentInput = "0";
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    function resetCalculator() {
        currentInput = "0";
        previousInput = "";
        currentOperator = null;
        shouldResetScreen = false;
        expressionEl.textContent = "";
        updateDisplay();
    }

    function toggleHistory() {
        const isOpen = appContainer.classList.contains("history-open");
        if (isOpen) {
            appContainer.classList.remove("history-open");
            historyBtnText.textContent = "History";
        } else {
            appContainer.classList.add("history-open");
            historyBtnText.textContent = "Close History";
        }
    }

    toggleHistoryBtn.addEventListener("click", toggleHistory);

    keypad.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.matches("button")) return;

        if (target.dataset.number) {
            appendNumber(target.dataset.number);
        } else if (target.dataset.action) {
            const action = target.dataset.action;
            if (action === "decimal") appendDecimal();
            if (action === "add") handleOperator("+");
            if (action === "subtract") handleOperator("-");
            if (action === "multiply") handleOperator("*");
            if (action === "divide") handleOperator("/");
            if (action === "percent") handleOperator("%");
            if (action === "calculate") calculate();
            if (action === "clear") resetCalculator();
            if (action === "delete") deleteNumber();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (["/", "Enter", "="].includes(e.key)) e.preventDefault();
        if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
        if (e.key === ".") appendDecimal();
        if (e.key === "+") handleOperator("+");
        if (e.key === "-") handleOperator("-");
        if (e.key === "*") handleOperator("*");
        if (e.key === "/") handleOperator("/");
        if (e.key === "%") handleOperator("%");
        if (e.key === "Enter" || e.key === "=") calculate();
        if (e.key === "Backspace") deleteNumber();
        if (e.key === "Escape") resetCalculator();
    });

    clearHistoryBtn.addEventListener("click", () => {
        history = [];
        sessionStorage.removeItem("calc-history");
        renderHistory();
    });

    updateDisplay();
    renderHistory();
});