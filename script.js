// Written by Joaomateus Dos Santos on May 2022

const screenOutput = document.querySelector('.screen-output');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const resetButton = document.querySelector('#ac');
const deleteButton = document.querySelector('#del');
const dotButton = document.querySelector('#dot');

let curNumber = '0';
let storedValNum = 0;
let storedValStr = '0';
let operator = '';
let currentlyDisplaying = 'input';

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
        case 'equals':
            return storedVal;
    }
}

numberButtons.forEach((number) => number.addEventListener('click', (e) => {
    if (operator != 'equals' && curNumber.length < 14) {
    curNumber += e.target.id;
    
    if (curNumber.length > 1 && curNumber.charAt(0) === '0') { //prevents inputs like 000006 
        if (curNumber.charAt(1) != '.'){ // allows inputs like 0.000006
            curNumber = curNumber.slice(1, curNumber.length);
        }
    }
    } else {
        return;
    }
    screenOutput.textContent = curNumber;
    currentlyDisplaying = 'input';
}))

operatorButtons.forEach((operatorInput) => operatorInput.addEventListener('click', checkOperation));

function checkOperation (e)  {

    if (currentlyDisplaying === 'answer') { // keeps from pressing the operator button multiple times
        operator = e.target.id; 
        return;
    }

    currentlyDisplaying = 'answer';
    
    if (operator.length === 0 && curNumber.length > 0){
        operator = e.target.id;
        storedValNum = Number.parseFloat(curNumber);  
        curNumber = '0';

        screenOutput.textContent = storedValNum;
        return;
    }

    else if (operator.length > 0 && curNumber.length > 0) {
        if (operator === 'divide' && curNumber === '0'){ // catch division by 0
            alert(`Beep Boop Beep Boop... Can Not Compute ${storedValNum} / ${curNumber}`)
            reset();
            return;
        }

        if (storedValNum === 0 && operator === 'equals') {
            return;
        }
        storedValNum = operate(operator, storedValNum, Number.parseFloat(curNumber));
        storedValStr = storedValNum.toString();
        curNumber = '0';
        
        if (storedValStr.length > 14) { // make sure the number isnt too large for screen
            screenOutput.textContent = `${storedValStr.slice(0, 13)}...`;
            return;
        }
        screenOutput.textContent = storedValStr;
    }
    
    operator = e.target.id; 
    
    
};

dotButton.addEventListener('click', () =>{
    if (currentlyDisplaying === 'answer') {
        return;
    }
    let curNumberArray = curNumber.split('');
    if (curNumberArray.some((char) =>  char === '.')) {
        return;
    }
    curNumberArray.push('.');
    curNumber = curNumberArray.join('');
    screenOutput.textContent = curNumber;
    ;
})

// deletes last number in the current displayed number but not of the actual answer aka storeVal
deleteButton.addEventListener('click', () => {
    if (curNumber.length > 0 && currentlyDisplaying === 'input') {
        curNumber = curNumber.slice(0, curNumber.length - 1);
        if (curNumber.length === 0) {
            screenOutput.textContent = '0';
            return;
        }
        screenOutput.textContent = curNumber;
    }
})

resetButton.addEventListener('click', reset)

function reset () {
    curNumber = '0';
    storedValNum = 0;
    storedValStr = '0';
    operator = '';
    currentlyDisplaying = 'input';
    screenOutput.textContent = '0';
}