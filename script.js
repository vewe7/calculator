function operate(a, b, operator) {
    if (operator == "+") {
        return a + b;
    } else if (operator == "-") {
        return a - b;
    } else if (operator == "×") {
        return a * b;
    } else if (operator == "÷") {
        if (b == 0)
            return "Error";
        return a / b;
    }
    return "Error";
}


const displayMain = document.querySelector("#display-main");
const displaySecondary = document.querySelector("#display-secondary");

const equals = document.querySelector("#equals");
const percent = document.querySelector("#percent");
const clear = document.querySelector("#clear");
const del = document.querySelector("#delete");
const decimal = document.querySelector("#decimal")

let bufferNum = null;
let currentNum = 0;
let currentOp = "";
let bufferEmpty = true;

function setCurrentNum(num) {
    currentNum = num;
    displayMain.textContent = currentNum.toString();
}
function setBuffer(num, op) {
    bufferNum = num;
    currentOp = op;
    displaySecondary.textContent = bufferNum.toString() + " " + op;
    bufferEmpty = false;
}
function emptyBuffer() {
    bufferNum = null; 
    currentOp = "";
    displaySecondary.textContent = "";
    bufferEmpty = true;
}

function calculate() {
    if (bufferEmpty)
        return;

    let result = operate(bufferNum, currentNum, currentOp);
    if (result == "Error") {
        reset();
        displayMain.textContent = "Error";
        return;
    }
    emptyBuffer();
    setCurrentNum(result);
}

function calculateAndPush(op) {
    let result = operate(bufferNum, currentNum, currentOp);
    if (result == "Error") {
        reset();
        displayMain.textContent = "Error";
        return;
    }
    setBuffer(result, op);
    setCurrentNum(0);
}

function reset() {
    bufferNum = null;
    currentNum = 0;
    currentOp = "";
    bufferEmpty = true;
    displayMain.textContent = "";
    displaySecondary.textContent = "";
}

function inputNum(num) {
    displayMain.textContent += num.toString();
    setCurrentNum(parseFloat(displayMain.textContent));
}

function inputOp(op) {
    if (bufferEmpty) {
        setBuffer(currentNum, op);
        setCurrentNum(0);
    } else {
        calculateAndPush(currentOp);
    }
}

function inputDelete() {
    let content = displayMain.textContent;
    content = content.substring(0, content.length - 1);
    if (content == "") {
        setCurrentNum(0);
    } else {
        setCurrentNum(parseFloat(content));
    }
}

function inputDecimal() {
    if (!displayMain.textContent.includes(".")) {
        displayMain.textContent += ".";
    }
}

// Event listeners for each numbered button. 
for (let i = 0; i < 10; i++) {
    button = document.querySelector(`.number[data-num="${i}"]`);
    button.addEventListener("click", () => {
        inputNum(i);
    });
}

// Event listeners for operators
let operatorButtons = document.querySelectorAll(".operator");
for (let i = 0; i < operatorButtons.length; i++) {
    let button = operatorButtons[i];
    let op = button.textContent; 
    button.addEventListener("click", () => {
        inputOp(op);
    });
}

// Event listener for equals button
equals.addEventListener("click", () => {
    calculate();
});

// Event listener for AC button
clear.addEventListener("click", () => {
    reset();
});

// Event listener for del button 
del.addEventListener("click", () => {
    inputDelete();
});

// Event listener for percent button
percent.addEventListener("click", () => {
    setCurrentNum(currentNum * 0.01);
});

// Event listener for decimal button
decimal.addEventListener("click", () => {
    inputDecimal();
});

// Allow keyboard inputs
window.addEventListener("keydown", function(e) {
    if (e.key >= "1" && e.key <= "9") {
        inputNum(parseInt(e.key));
    } 
    else if (e.key == "+" || e.key == "-") {
        inputOp(e.key);
    }
    else if (e.key == "/") {
        inputOp("÷");
    }
    else if (e.key == "*") {
        inputOp("×");
    }
    else if (e.key == ".") {
        inputDecimal();
    }
    else if (e.key == "Enter") {
        calculate();
    }
    else if (e.key == "Backspace") {
        inputDelete();
    }
});