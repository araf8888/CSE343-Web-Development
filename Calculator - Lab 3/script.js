const display = document.getElementById('display');
const buttons = document.getElementsByClassName('btn');

let operand1 = null;
let operand2 = null;
let operator = null;


Array.from(buttons).forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    
    
    if (!isNaN(value) || value === '.') {
      display.value += value;
    }

    else if (['+', '-', '*', '/'].includes(value)) {
      operand1 = parseFloat(display.value);
      operator = value;
      display.value = ''; // clear display for operand2
    }

    else if (value === '=') {
      operand2 = parseFloat(display.value);

      if (operand1 !== null && operator && !isNaN(operand2)) {
        let result;
        switch (operator) {
          case '+': result = operand1 + operand2; break;
          case '-': result = operand1 - operand2; break;
          case '*': result = operand1 * operand2; break;
          case '/':
            result = operand2 === 0 ? 'Error' : operand1 / operand2;
            break;
        }

        // Display result 
        display.value = result;
        operand1 = result; // allow chaining
        operand2 = null;
        operator = null;
      }
    }

    
    else if (value === 'C') {
      display.value = '';
      operand1 = operand2 = operator = null;
    }

    // Backspace
    else if (value === 'Å©') {
      display.value = display.value.slice(0, -1);
    }
  });
});
