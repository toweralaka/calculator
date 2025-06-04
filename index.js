let firstNumber = "";
let secondNumber = "";
let currentNumber = "";
let operator = "";
let operatorOn = true;
let decimalUsed = false;
let clearScreen = true;
let canDelete = false;
let screen = document.querySelector(".screen");
let decimalBtn = document.querySelector(".decimal");
let equateBtn = document.querySelector(".equate");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");

const add = () => {
    console.log("add")
}

const subtract = () => {
    console.log("subtract")
}

const multiply = () => {
    console.log("multiply")
}

const divide = () => {
    console.log("divide")
}

const operate = () => {
    console.log("operate")
    console.log(screen.textContent)
}

const resetVariables = () => {
    operatorOn = true;
    decimalUsed = false;
    clearScreen = true;
}
const disableDecimal = () => {
    decimalBtn.disabled = true
}

document.querySelectorAll(".number").forEach(element=>{
    element.addEventListener("click", event =>{
        if(clearScreen == true){
            screen.textContent = event.target.textContent;
            clearScreen = false;
            canDelete = true;
        }else{
            screen.textContent = screen.textContent + event.target.textContent;
        }
        operatorOn = false;
    })
})

document.querySelectorAll(".operator").forEach(element=>{
    element.addEventListener("click", event =>{
        if(operatorOn == false){
            operatorOn = true;
            screen.textContent = screen.textContent + event.target.textContent
        }
    })
})

decimalBtn.addEventListener("click", (event)=>{
    if(decimalUsed == false){
        decimalUsed = true;
        clearScreen = false;
        canDelete = true
        screen.textContent = screen.textContent + event.target.textContent
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
        let operatorArray = ["+", "-", "x", "÷"];
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
        }else{
            screen.textContent = newValue;
        }
    }
})

clearBtn.addEventListener("click", ()=>{
    resetVariables()
    screen.textContent = "";
})