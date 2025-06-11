let firstNumber = null;
let secondNumber = null;
let currentNumber = null;
let operator = null;
let operatorOn = true;
let decimalUsed = false;
let clearScreen = true;
let canDelete = false;
let screen = document.querySelector(".screen");
let decimalBtn = document.querySelector(".decimal");
let equateBtn = document.querySelector(".equate");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");
let operatorArray = ["+", "-", "x", "÷"];

const add = (a,b) => {
    return a + b 
}

const subtract = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const divide = (a, b) => {
    return a / b
}

const operate = () => {
    if(firstNumber == null){
        return
    }
    if(currentNumber == null && secondNumber == null){
        return
    }
    if(secondNumber == null){
        secondNumber = Number(currentNumber);
        currentNumber = null;
    }
    let operatorFunction;
    switch(operator){
        case "-":
            operatorFunction = subtract;
            break;
        case "÷":
            operatorFunction = divide;
            break;
        case "x":
            operatorFunction = multiply;
            break;
        default:
            operatorFunction = add;

    }
    currentNumber = operatorFunction(firstNumber, secondNumber);
    screen.textContent = currentNumber;
    firstNumber = null;
    secondNumber = null;
}

const resetVariables = () => {
    firstNumber = null;
    secondNumber = null;
    currentNumber = null;
    operator = null;
    operatorOn = true;
    decimalUsed = false;
    clearScreen = true;
}
const disableDecimal = () => {
    decimalBtn.disabled = true
}

const updateCurrentNumber = (newDigit)=>{
    if(currentNumber == null){
        currentNumber = newDigit;
    }else{
        currentNumber = currentNumber + newDigit;
    }
}

const resetNumbers = (newString)=>{
    let onFirstNumber = true;
    currentNumber = null;
    firstNumber = null;
    secondNumber = null;
    newString.split("").forEach(i=>{
        if(operatorArray.includes(i)){
            onFirstNumber = false;
            firstNumber = Number(currentNumber)
            currentNumber = null;
            operator = i;
        }
        if(onFirstNumber == true){
            updateCurrentNumber(i);
        }else{
            updateCurrentNumber(i);
        }
    })
}

document.querySelectorAll(".number").forEach(element=>{
    element.addEventListener("click", event =>{
        let newDigit = event.target.textContent;
        if(clearScreen == true){
            screen.textContent = newDigit;
            clearScreen = false;
            canDelete = true;
        }else{
            screen.textContent = screen.textContent + newDigit;
        }
        operatorOn = false;
        updateCurrentNumber(newDigit)
    })
})

document.querySelectorAll(".operator").forEach(element=>{
    element.addEventListener("click", event =>{
        if(currentNumber == null){
            return
        }
        let operatorSign = event.target.textContent;
        decimalUsed = false;
        if(firstNumber == null){
            firstNumber = Number(currentNumber);
            currentNumber = null;
            screen.textContent = screen.textContent + operatorSign;
        }else{
            if(secondNumber == null){
                secondNumber = Number(currentNumber);
                currentNumber = null;
                operate()
                operator = operatorSign;
                firstNumber = currentNumber;
                currentNumber = null;
                screen.textContent = screen.textContent + operatorSign;
            }
        }
    })
})

decimalBtn.addEventListener("click", (event)=>{
    if(decimalUsed == false){
        decimalUsed = true;
        clearScreen = false;
        canDelete = true;
        screen.textContent = screen.textContent + event.target.textContent;
        updateCurrentNumber(event.target.textContent);
    }
})

equateBtn.addEventListener("click", ()=>{
    if(operatorOn == false){
        operate()
        resetVariables()
    }
})

deleteBtn.addEventListener("click", ()=>{
    if(canDelete == true){
        let oldVal = screen.textContent;
        let valueLength = oldVal.length;
        let oldValStr = oldVal.split("");
        let lastIndex = valueLength - 1;
        //check if operator is deleted
        if(operatorArray.includes(oldValStr[lastIndex])){
            operatorOn = false;
        }
        //check if decimal is deleted
        if(oldValStr[-1] == "."){
            decimalUsed = false;
        }
        let newValue = oldValStr.slice(0, valueLength-1)
            .join("");
        if(newValue.length < 1){
            canDelete = false;
            clearScreen = true;
            screen.textContent = 0;
            currentNumber = null;
            firstNumber = null;
            secondNumber = null;
        }else{
            screen.textContent = newValue;
        }
        resetNumbers(newValue);
    }
})

clearBtn.addEventListener("click", ()=>{
    resetVariables()
    screen.textContent = "";
})