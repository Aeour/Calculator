  function add(a,b) {
                return a + b;
            }

            function subtract(a,b) {
                return a - b;
            }

            function multiply(a,b) {
                return a * b;
            }

            function divide(a,b) {
                if (b === 0) {
                    alert("get rekt")
                    location.reload();
                } else {
                    return a / b;
                }
            }

            function operate(operator, a, b) {
                if (operator === 'x') {
                    operator = '*'
                }
                switch(operator) {
                    case '+':
                        return add(a,b);
                        break;
                    case '-':
                        return subtract(a,b);
                        break;
                    case '*':
                        return multiply(a,b);
                        break;
                    case '/':
                        return divide(a,b);
                        break;
                }
            }

            function clearCalc() {
                runningNum = '';
                runningTotal = '';
                operator = '';
                firstNum = '';
            }

            function operateChecker(operatorInput, num) {
                display.innerHTML = operatorInput;
                if (equalPushed) {
                    if (operate(operatorInput, firstNum, num) % 1 === 0) {
                        display.innerHTML = operate(operatorInput, firstNum, num);
                    } else {
                        display.innerHTML = operate(operatorInput, firstNum, num).toFixed(7);
                    }
                } else if (firstNum === ''){
                    operator = operatorInput;
                    firstNum = num;
                } else {
                    firstNum = operate(lastOperator, firstNum, num);
                }
            }

            let buttons = document.querySelectorAll('button');
            let display = document.getElementById('nums');
            let firstNum = '';
            let runningNum = '';
            let operator = '';
            let lastOperator = '';
            let equalPushed = false;

            buttons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    let input = e.target.innerHTML;
                    let inputId = e.target.id;
                    if(equalPushed){
                        display.innerHTML = '';
                        equalPushed = false;
                    }
                    if (inputId === 'clearButton'){
                        display.innerHTML = '';
                        clearCalc();
                    } else if (inputId === 'backArrow' || inputId === 'backButton'){
                        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1)
                        runningNum = runningNum.substring(0, runningNum.length-1)
                    } else if (inputId === 'divideButton' || inputId === 'timesButton' || inputId === 'minusButton' || inputId === 'plusButton' || inputId === 'equalButton'){
                        if(inputId != 'equalButton'){
                            lastOperator = operator;
                            operator = input;
                        } else {
                            equalPushed = true;
                        }
                        operateChecker(operator, Number(runningNum));
                    } else {
                        if(display.innerHTML === '/' || display.innerHTML === '+' || display.innerHTML === '-' || display.innerHTML === 'x'){
                            display.innerHTML = '';
                            runningNum = '';
                        }
                        if (!(runningNum.includes('.') && input === '.')){
                            runningNum += input;
                            display.innerHTML += input;
                        }
                    }
                })
            })
