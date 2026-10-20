document.addEventListener("DOMContentLoaded", () => {
    const expressionEl = document.getElementById("expression");
    const resultEl = document.getElementById("result");
    const keypad = document.querySelector(".keypad");
    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history");
    const resetCalcBtn = document.getElementById("reset-calc");
    
    const pageLayout = document.querySelector(".page-layout");
    const toggleHistoryBtn = document.getElementById("toggle-history");
    const historyBtnText = document.getElementById("history-btn-text");

    let currentInput = "0";          
    let previousInput = "";          
    let currentOperator = null;      
    let shouldResetScreen = false;   
    let lastOperatorString = ""; 
    
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
        if (currentOperator !== null) {
            const opSymbol = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" }[currentOperator];
            expressionEl.textContent = `${formatNumber(previousInput)} ${opSymbol}`;
        } else if (lastOperatorString !== "") {
            expressionEl.textContent = lastOperatorString;
        } else {
            expressionEl.textContent = "";
        }
        
        resultEl.textContent = formatNumber(currentInput);
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
                lastOperatorString = "";
                shouldResetScreen = false;
                updateDisplay();
                if (window.innerWidth <= 800 && pageLayout.classList.contains("history-open")) {
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
        if (shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
            lastOperatorString = ""; 
        } else {
            if (currentInput === "0") {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (shouldResetScreen) {
            currentInput = "0.";
            shouldResetScreen = false;
            lastOperatorString = "";
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
        lastOperatorString = "";
        updateDisplay();
    }

    // --- NEW PERCENTAGE LOGIC ---
    function applyPercentage() {
        if (currentInput === "Error" || currentInput === "0") return;
        
        let currentValue = parseFloat(currentInput.replace(/,/g, ""));
        let percentValue = 0;

        // If there's an active operator (e.g., 100 + 10%), calculate 10% of 100
        if (currentOperator !== null && previousInput !== "") {
            let prevValue = parseFloat(previousInput.replace(/,/g, ""));
            percentValue = (prevValue * currentValue) / 100;
        } else {
            // If no operator, just divide by 100 (e.g., 50% becomes 0.5)
            percentValue = currentValue / 100;
        }

        currentInput = percentValue.toString();
        updateDisplay();
    }

    function calculate() {
        if (currentOperator === null || shouldResetScreen) return;

        const prev = parseFloat(previousInput.replace(/,/g, ""));
        const current = parseFloat(currentInput.replace(/,/g, ""));
        let result = 0;

        const opSymbol = { "+": "+", "-": "−", "*": "×", "/": "÷" }[currentOperator];

        switch (currentOperator) {
            case "+": result = prev + current; break;
            case "-": result = prev - current; break;
            case "*": result = prev * current; break;
            case "/": 
                if (current === 0) {
                    currentInput = "Error";
                    currentOperator = null;
                    shouldResetScreen = true;
                    lastOperatorString = "";
                    updateDisplay();
                    return;
                }
                result = prev / current; 
                break;
        }

        result = Math.round(result * 100000000) / 100000000;
        
        lastOperatorString = `${formatNumber(previousInput)} ${opSymbol} ${formatNumber(currentInput)} =`;
        
        // Save the expression before resetting the variables for the history list
        let historyExpression = `${formatNumber(previousInput)} ${opSymbol} ${formatNumber(currentInput)}`;
        
        currentInput = result.toString();
        currentOperator = null;
        previousInput = "";
        shouldResetScreen = true;
        
        updateDisplay();
        saveHistory(historyExpression, formatNumber(currentInput));
    }

    function deleteNumber() {
        if (currentInput === "Error" || shouldResetScreen) {
            resetCalculator();
            return;
        }
        
        if (currentInput.length === 1 || currentInput === "0") {
            currentInput = "0";
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    function negateNumber() {
        if (currentInput === "0" || currentInput === "Error") return;
        if (currentInput.startsWith("-")) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = "-" + currentInput;
        }
        updateDisplay();
    }

    function resetCalculator() {
        currentInput = "0";
        previousInput = "";
        currentOperator = null;
        shouldResetScreen = false;
        lastOperatorString = "";
        updateDisplay();
    }

    function toggleHistory() {
        const isOpen = pageLayout.classList.contains("history-open");
        if (isOpen) {
            pageLayout.classList.remove("history-open");
            historyBtnText.textContent = "History";
        } else {
            pageLayout.classList.add("history-open");
            historyBtnText.textContent = "Close";
        }
    }

    // --- Event Listeners ---
    
    toggleHistoryBtn.addEventListener("click", toggleHistory);
    resetCalcBtn.addEventListener("click", resetCalculator);

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
            if (action === "percent") applyPercentage(); // <-- Updated here
            if (action === "calculate") calculate();
            if (action === "clear") resetCalculator();
            if (action === "delete") deleteNumber();
            if (action === "negate") negateNumber();
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
        if (e.key === "%") applyPercentage(); // <-- Updated here
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