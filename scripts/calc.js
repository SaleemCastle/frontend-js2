let displayVal = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let shouldClearDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
});

document.addEventListener("keydown", handleKeyboardInput);

function handleClick(event) {
    const buttonValue = event.target.value;

    if (event.target.classList.contains("operand")) {
        handleOperandClick(buttonValue);
    } else if (event.target.classList.contains("operator")) {
        handleOperatorClick(buttonValue);
    } else if (event.target.classList.contains("equals")) {
        handleEqualsClick();
    } else if (event.target.classList.contains("decimal")) {
        handleDecimalClick();
    } else if (event.target.classList.contains("clear")) {
        handleClearClick();
    } else if (event.target.classList.contains("sign")) {
        handleSignClick();
    } else if (event.target.classList.contains("undo")) {
        handleUndoClick();
    }

    updateDisplay();
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        handleOperandClick(key);
    } else if (/[+\-*/]/.test(key)) {
        handleOperatorClick(key);
    } else if (key === "." || key === ",") {
        handleDecimalClick();
    } else if (key === "=" || key === "Enter") {
        handleEqualsClick();
    } else if (key === "Backspace") {
        handleUndoClick();
    } else if (key === "Delete") {
        handleClearClick();
    } else if (key === "s" || key === "S") {
        handleSignClick();
    }

    updateDisplay();
}

function handleOperandClick(value) {
    if (shouldClearDisplay) {
        displayVal = value;
        shouldClearDisplay = false;
    } else {
        if (displayVal === "0" || waitingForSecondOperand) {
            displayVal = value;
            waitingForSecondOperand = false;
        } else {
            displayVal += value;
        }
    }
}

function handleOperatorClick(op) {
    if (firstOperand === null) {
        firstOperand = parseFloat(displayVal);
    } else if (operator !== null && !waitingForSecondOperand) {
        firstOperand = calculate(firstOperand, parseFloat(displayVal), operator);
        displayVal = firstOperand.toString();
    }

    operator = op;
    waitingForSecondOperand = true;
    shouldClearDisplay = false;
}

function handleEqualsClick() {
    if (operator !== null && !waitingForSecondOperand) {
        firstOperand = calculate(firstOperand, parseFloat(displayVal), operator);
        displayVal = firstOperand.toString();
        operator = null;
    }
    shouldClearDisplay = true;
}

function handleDecimalClick() {
    if (!displayVal.includes(".")) {
        displayVal += ".";
    }
}

function handleClearClick() {
    displayVal = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    shouldClearDisplay = false;
}

function handleSignClick() {
    displayVal = (-parseFloat(displayVal)).toString();
}

function handleUndoClick() {
    displayVal = displayVal.slice(0, -1) || "0";
}

function updateDisplay() {
    display.textContent = displayVal;
}

function calculate(num1, num2, op) {
    switch (op) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return "Error";
            }
            return num1 / num2;
        default:
            return num2;
    }
}
