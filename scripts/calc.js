let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
  
updateDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputToDisplay(buttons[i].value)
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputToDisplay(buttons[i].value)
                updateDisplay();
            } else if(buttons[i].classList.contains('undo')) {
                inputUndo(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}
clickButton();


function inputOperator(operator) {
  if(firstOperator != null && secondOperator === null) {
      //4th click - handles input of 2nd operator
      secondOperator = operator;
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
  } else if(firstOperator != null && secondOperator != null) {
      //6th click - new secondOperator
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
      secondOperator = operator;
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
  } else { 
      //2nd click - handles first operator input
      firstOperator = operator;
      firstOperand = displayValue;
  }
}


function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'error') {
            displayValue = 'error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'error') {
            displayValue = 'error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}


function inputToDisplay(input_type){

  console.log(input_type);
  if (input_type === "."){
    if(displayValue === firstOperand || displayValue === secondOperand) {
      displayValue = '0';
      displayValue += input_type;
    } else if(!displayValue.includes(input_type)) {
        displayValue += input_type;
    } 
  }
  else if (typeof(parseInt(input_type)) === "number"){
    if(firstOperator === null) {
      if(displayValue === '0' || displayValue === 0) {
          //1st click - handles first operand input
          displayValue = input_type;
      } else if(displayValue === firstOperand) {
          //starts new operation after inputEquals()
          displayValue = input_type;
      } else {
          displayValue += input_type;
      }
    } else {
        //3rd/5th click - inputs to secondOperand
        if(displayValue === firstOperand) {
            displayValue = input_type;
        } else {
            displayValue += input_type;
        }
    }
  }

}

function inputUndo(num) {
  displayValue = '0';
  //firstOperand = null;
  //secondOperand = null;
  //firstOperator = null;
  //secondOperator = null;
  //result = null;
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

function operate(num1, num2, operator) {

  switch(operator) {
    case '+':
      return num1 + num2;
      break;
    case '-':
      return num1 - num2;
      break;
    case '*':
      return num1 * num2;
      break;
    case '/':
      if(num2 === 0) {
        return 'error';
      } else {
        return num1 / num2;
      }
      break;
  } 

}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}