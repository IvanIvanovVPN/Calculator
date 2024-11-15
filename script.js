document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const screen = document.querySelector('.calculator-screen');
    
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let result = '';
    let resetScreen = false;
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            
            if (button.classList.contains('operator')) {
                handleOperator(buttonText);
            } else if (button.classList.contains('clear')) {
                clearScreen();
            } else if (button.classList.contains('delete')) {
                deleteLastChar();
            } else {
                handleNumber(buttonText);
            }
        });
    });
    
    function handleNumber(number) {
        if (resetScreen) {
            screen.value = number;
            resetScreen = false;
        } else {
            screen.value += number;
        }
        currentInput = screen.value.replace(/ /g, '');
    }
    
    function handleOperator(op) {
        if (op === '=') {
            if (operator && firstValue && currentInput) {
                secondValue = currentInput;
                result = calculate(firstValue, operator, secondValue);
                screen.value = result;
                currentInput = result;
                resetScreen = true;
            }
        } else {
            if (currentInput && !resetScreen) {
                firstValue = currentInput;
                operator = op;
                screen.value += ` ${op} `;
                resetScreen = true;
            }
        }
    }
    
    function calculate(first, op, second) {
        const firstNum = parseFloat(first);
        const secondNum = parseFloat(second);
        
        switch (op) {
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            case '*':
                return firstNum * secondNum;
            case '/':
                return firstNum / secondNum;
            default:
                return secondNum;
        }
    }
    
    function clearScreen() {
        screen.value = '';
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        result = '';
    }
    
    function deleteLastChar() {
        screen.value = screen.value.slice(0, -1);
        currentInput = screen.value.replace(/ /g, '');
    }
});
