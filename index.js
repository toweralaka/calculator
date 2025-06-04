let firstNumber = "";
let secondNumber = "";
let currentNumber = "";
let operator = "";
let operatorOn = false;
let screen = document.querySelector(".screen");
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
}

document.querySelectorAll(".button").forEach(element=>{
    element.addEventListener("click", event =>{
        screen.textContent = screen.textContent + event.target.textContent
    })
})