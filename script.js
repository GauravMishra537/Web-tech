let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = previousOperand;
    }
}

function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }
    
    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '0' && previousOperand === '') return;
    
    if (operation !== undefined) calculate();
    
    operation = operator;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    if (operation === undefined || shouldResetScreen) return;
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }
    
    // Format the result to avoid long decimal numbers
    if (typeof result === 'number') {
        result = Math.round(result * 1000000) / 1000000;
        result = result.toString();
    }
    
    currentOperand = result;
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Initialize display
updateDisplay();