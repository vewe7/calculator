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

// Event listeners for each numbered button. 
for (let i = 0; i < 10; i++) {
    button = document.querySelector(`.number[data-num="${i}"]`);
    button.addEventListener("click", () => {
        setCurrentNum(currentNum * 10 + i);
    });
}

// Event listeners for operators
let operatorButtons = document.querySelectorAll(".operator");
for (let i = 0; i < operatorButtons.length; i++) {
    let button = operatorButtons[i];
    let op = button.textContent; 
    button.addEventListener("click", () => {
        if (bufferEmpty) {
            setBuffer(currentNum, op);
            setCurrentNum(0);
        } else {
            calculateAndPush(currentOp);
        }
    });
}

// Event listener for equals button
equals.addEventListener("click", () => {
    if (!bufferEmpty) {
        calculate();
    }
});

// Event listener for AC button
clear.addEventListener("click", () => {
    reset();
});

// Event listener for del button 
del.addEventListener("click", () => {
    let content = displayMain.textContent;
    content = content.substring(0, content.length - 1);
    if (content == "") {
        setCurrentNum(0);
    } else {
        setCurrentNum(parseFloat(content));
    }
});

// Event listener for percent button
percent.addEventListener("click", () => {
    setCurrentNum(currentNum * 0.01);
});

