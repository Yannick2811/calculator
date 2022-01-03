function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x': 
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}

const btnNumber = document.querySelectorAll("[data-number")
const screen = document.querySelector("#screen")
const btnDelete = document.querySelector("#delete")
const btnClear = document.querySelector('#clear')
const btnOperator = document.querySelectorAll('[data-operator]')
const equals = document.querySelector('.istgleich')
const currentScreen = document.querySelector('#currentScreen')
const lastScreen = document.querySelector('#lastScreen')
let currentOperator = ""
let firstOperand = ""
let secondOperand = ""

btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent)
    })
})
btnOperator.forEach(button => {
    button.addEventListener('click', () => {
        switchScreens(button.value)
    })
})

function clearScreen() {
    currentScreen.textContent = ""
    lastScreen.textContent = ""
    equals.disabled = false
}

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
}

function resetScreen() {
    currentScreen.textContent = ''
}

function appendNumber(number) {
    currentScreen.textContent += number;
}

btnDelete.addEventListener('click', deleteNumber)
btnClear.addEventListener('click', clearScreen)


function appendOperator(operator) {
    screen.textContent +=  operator;
}

function appendPoint() {
    currentScreen += "."
}

function switchScreens(operator) {
    firstOperand = currentScreen.textContent
    currentOperator = operator
    lastScreen.textContent = `${firstOperand} ${currentOperator}`
    resetScreen()
}

function evaluate() {
    if(currentOperator === "÷" && secondOperand === "0") {
        alert("You can't divide with 0!")
    }else{
    secondOperand = currentScreen.textContent
    lastScreen.textContent += ' ' + secondOperand
    resetScreen()
    currentScreen.textContent = roundResult(operate(firstOperand, secondOperand, currentOperator))
    equals.disabled = true
}
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

equals.addEventListener('click', evaluate)

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clearScreen()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      switchScreens(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }

  window.addEventListener('keydown', handleKeyboardInput)

