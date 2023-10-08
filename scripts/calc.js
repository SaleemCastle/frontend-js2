let display_val = '0';
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
    display.innerText = display_val;
    if(display_val.length > 9) {
        display.innerText = display_val.substring(0, 9);
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
                inputUndo(display_val);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(display_val);
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
      operand_2 = display_val;
      result = operate(Number(operand_1), Number(operand_2), operator_1);
      display_val = roundAccurately(result, 15).toString();
      operand_1 = display_val;
      result = null;
  } else if(operator_1 != null && operator_2 != null) {
      // sixth click - new operator_2
      operand_2 = display_val;
      result = operate(Number(operand_1), Number(operand_2), operator_2);
      operator_2 = operator;
      display_val = roundAccurately(result, 15).toString();
      operand_1 = display_val;
      result = null;
  } else { 
      // Second click - first operator input handling
      operator_1 = operator;
      operand_1 = display_val;
  }
}


function inputEquals() {
    // Do not display undefined before operate() when hitting equals
    if(operator_1 === null) {
        display_val = display_val;
    } else if(operator_2 != null) {
        // Final result handling
        operand_2 = display_val;
        result = operate(Number(operand_1), Number(operand_2), operator_2);
        if(result === 'error') {
            display_val = 'error';
        } else {
            display_val = roundAccurately(result, 15).toString();
            operand_1 = display_val;
            operand_2 = null;
            operator_1 = null;
            operator_2 = null;
            result = null;
        }
    } else {
        // First operation handling
        operand_2 = display_val;
        result = operate(Number(operand_1), Number(operand_2), operator_1);
        if(result === 'error') {
            display_val = 'error';
        } else {
            display_val = roundAccurately(result, 15).toString();
            operand_1 = display_val;
            operand_2 = null;
            operator_1 = null;
            operator_2 = null;
            result = null;
        }
    }
}


function inputToDisplay(input_type){

  if (input_type === "."){
    if(display_val === operand_1 || display_val === operand_2) {
      display_val = '0';
      display_val += input_type;
    } else if(!display_val.includes(input_type)) {
        display_val += input_type;
    } 
  }
  else if (typeof(parseInt(input_type)) === "number"){
    if(operator_1 === null) {
      if(display_val === '0' || display_val === 0) {
          // First click - handling first operand input
          display_val = input_type;
      } else if(display_val === operand_1) {
          // Starts new operation after inputEquals()
          display_val = input_type;
      } else {
          display_val += input_type;
      }
    } else {
        // third and fifth click - inputs to operand_2
        if(display_val === operand_1) {
            display_val = input_type;
        } else {
            display_val += input_type;
        }
    }
  }

}

function inputUndo(num) {
  display_val = '0';
  //operand_1 = null;
  //operand_2 = null;
  //operator_1 = null;
  //operator_2 = null;
  //result = null;
}

function inputSign(num) {
    display_val = (num * -1).toString();
}

function clearDisplay() {
    display_val = '0';
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

const basic_operations = {
    add: function(input1, input2) {
        return input1 + input2
    },
    subtract: function(input1, input2) {
        return input1 - input2
    },
    multiply: function(input1, input2) {
        return input1 * input2
    },
    divide: function(input1, input2) {
        return input1 / input2
    }
}

function operate(num1, num2, operator) {
    const { add, subtract, multiply, divide } = basic_operations;
    switch(operator) {
    case '+':
        return add(num1, num2);
    case '-':
        return subtract(num1, num2);
    case '*':
        return multiply(num1, num2);
    case '/':
        if(num2 === 0) {
        return 'error';
        } else {
        return divide(num1, num2);
        }
    } 
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}