let displayVal = '0';
let operand_1 = null;
let operand_2 = null;
let operator_1 = null;
let operator_2 = null;
let result = null;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayVal;
    if(displayVal.length > 9) {
        display.innerText = displayVal.substring(0, 9);
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
                inputUndo(displayVal);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayVal);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}
clickButton();


function inputOperator(operator) {
  if(operator_1 != null && operator_2 === null) {
      // fourth click - input of 2nd operator handling
      operator_2 = operator;
      operand_2 = displayVal;
      result = operate(Number(operand_1), Number(operand_2), operator_1);
      displayVal = roundAccurately(result, 15).toString();
      operand_1 = displayVal;
      result = null;
  } else if(operator_1 != null && operator_2 != null) {
      // sixth click - new operator_2
      operand_2 = displayVal;
      result = operate(Number(operand_1), Number(operand_2), operator_2);
      operator_2 = operator;
      displayVal = roundAccurately(result, 15).toString();
      operand_1 = displayVal;
      result = null;
  } else { 
      // Second click - first operator input handling
      operator_1 = operator;
      operand_1 = displayVal;
  }
}


function inputEquals() {
    // Do not display undefined before operate() when hitting equals
    if(operator_1 === null) {
        displayVal = displayVal;
    } else if(operator_2 != null) {
        // Final result handling
        operand_2 = displayVal;
        result = operate(Number(operand_1), Number(operand_2), operator_2);
        if(result === 'error') {
            displayVal = 'error';
        } else {
            displayVal = roundAccurately(result, 15).toString();
            operand_1 = displayVal;
            operand_2 = null;
            operator_1 = null;
            operator_2 = null;
            result = null;
        }
    } else {
        // First operation handling
        operand_2 = displayVal;
        result = operate(Number(operand_1), Number(operand_2), operator_1);
        if(result === 'error') {
            displayVal = 'error';
        } else {
            displayVal = roundAccurately(result, 15).toString();
            operand_1 = displayVal;
            operand_2 = null;
            operator_1 = null;
            operator_2 = null;
            result = null;
        }
    }
}


function inputToDisplay(input_type){

  console.log(input_type);
  if (input_type === "."){
    if(displayVal === operand_1 || displayVal === operand_2) {
      displayVal = '0';
      displayVal += input_type;
    } else if(!displayVal.includes(input_type)) {
        displayVal += input_type;
    } 
  }
  else if (typeof(parseInt(input_type)) === "number"){
    if(operator_1 === null) {
      if(displayVal === '0' || displayVal === 0) {
          // First click - handling first operand input
          displayVal = input_type;
      } else if(displayVal === operand_1) {
          // Starts new operation after inputEquals()
          displayVal = input_type;
      } else {
          displayVal += input_type;
      }
    } else {
        // third and fifth click - inputs to operand_2
        if(displayVal === operand_1) {
            displayVal = input_type;
        } else {
            displayVal += input_type;
        }
    }
  }

}

function inputUndo(num) {
  displayVal = '0';
  //operand_1 = null;
  //operand_2 = null;
  //operator_1 = null;
  //operator_2 = null;
  //result = null;
}

function inputSign(num) {
    displayVal = (num * -1).toString();
}

function clearDisplay() {
    displayVal = '0';
    operand_1 = null;
    operand_2 = null;
    operator_1 = null;
    operator_2 = null;
    result = null;
}

function inputBackspace() {
    if(operand_1 != null) {
        operand_1 = null;
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