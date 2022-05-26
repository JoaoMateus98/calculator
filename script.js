// Written by Joaomateus Dos Santos on May 2022

const screenOutput = document.querySelector('.screen-output');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const resetButton = document.querySelector('#ac');
const deleteButton = document.querySelector('#del');

console.log(deleteButton);

let curNumber = '';
let storedVal = '';
let operator = '';

function add (storedVal, curNumber) {
    return storedVal + curNumber;
}

function subtract (storedVal, curNumber) {
    return storedVal - curNumber;
}

function multiply (storedVal, curNumber) {
    return storedVal * curNumber;
}

function divide (storedVal, curNumber) {
    return storedVal / curNumber;
}

function operate (operator, storedVal, curNumber) {
    switch (operator) {
        case 'add':
            return add(storedVal, curNumber)
        case 'subtract':
            return subtract(storedVal, curNumber);
        case 'multiply':
             return multiply(storedVal, curNumber);
        case 'divide':
            return divide(storedVal, curNumber);
        default:
            return;
    }
}

// displays numbers to screen
numberButtons.forEach((number) => number.addEventListener('click', (e) => {
    if (operator != 'equals') {
    curNumber += e.target.id;
    } else {
        return;
    }
    screenOutput.textContent = curNumber;
}))

operatorButtons.forEach((operatorInput) => operatorInput.addEventListener('click', checkOperation));

// first it checks if user presed a operator button, if not assign current number in storedVal
// next time they click operator button the answer is displayed and answer is stored in storedVal
function checkOperation (e)  {
    if (operator.length === 0 && curNumber.length > 0){
        operator = e.target.id;
        storedVal = Number.parseInt(curNumber);  
        curNumber = '';

        screenOutput.textContent = storedVal;
        return;
    }

    else if (operator.length > 0 && curNumber.length > 0) {
        storedVal = operate(operator, storedVal, Number.parseInt(curNumber));
        curNumber = '';

        screenOutput.textContent = storedVal;
    }
    operator = e.target.id;
};

// deletes last number in the current displayed number but not of the actual answer aka storeVal
deleteButton.addEventListener('click', () => {
    if (curNumber.length > 0) {
        curNumber = curNumber.slice(0, curNumber.length - 1);
        screenOutput.textContent = curNumber;
    }
})

// resets all the values
resetButton.addEventListener('click', () => {
    curNumber = '';
    storedVal = '';
    operator = '';
    screenOutput.textContent = '';
})