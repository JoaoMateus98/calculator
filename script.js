function add (nums) {
    const ans = nums.reduce((previousNumber, currentNumber) => previousNumber + currentNumber);
    return ans;
}

function subtract (nums) {
    const ans = nums.reduce((previousNumber, currentNumber) => previousNumber - currentNumber);
    return ans;
}

function multiply (nums) {
    const ans = nums.reduce((previousNumber, currentNumber) => previousNumber * currentNumber);
    return ans;
}

function divide (nums) {
    const ans  = nums.reduce((previousNumber, currentNumber) => previousNumber / currentNumber);
    return ans;
}

function operate (operator, ...nums) {
    switch (operator) {
        case 'add':
            return add(nums);
        case 'subtract':
            return subtract(nums);
        case 'multiply':
             return multiply(nums);
        case 'divide':
            return divide(nums);
        default:
            console.log('Invalid operator');
            break;
    }
}

console.log(operate('multiply', 5, 5, 5));