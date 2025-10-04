const display=document.querySelector("#display");
display.textContent="";
const buttons=document.querySelectorAll(".cal-btn");


const add=(a,b)=>a+b;
const subtract=(a,b)=>a-b;
const multiply=(a,b)=>a*b;
const divide = (a, b) => {
    if (b === 0) {
        num1 = num2 = currOperator = null;
        shouldResetDisplay = true;
        return "Error"; 
    }
    return a / b;
};
const power=(a,b)=>a**b;
const modulo=(a,b)=>a%b;


let num1=null;
let num2=null;
let currOperator=null;
let shouldResetDisplay = false;

const operate=function(operator,num1,num2){
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    switch (operator){
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "x":
            return multiply(num1,num2);
            break;
        case "÷":
            return divide(num1,num2);
            break;
        case "^":
            return power(num1,num2);
            break;
        case "%":
            return modulo(num1,num2);
            break;
        default:
            return "Error";
    }
}
const updateDisplay=(value)=>{
    let displayContent=display.textContent;
    if (shouldResetDisplay){
        displayContent="";
        shouldResetDisplay=false;
    }
    if (value === ".") {
        if (displayContent.includes(".")) return; 
        if (displayContent === "") displayContent = "0"; 
    }
    if (displayContent.length >= 10) return;
    display.textContent = displayContent + value;
};
const handleClick=function(value){
    if (display.textContent === "Error" && value !== "C") {
        display.textContent = "0";
        shouldResetDisplay = false;
    }
    if (!isNaN(value)|| value==="."){
        updateDisplay(value);
    } else if (value === "C") {
        display.textContent = "";
        num1= null;
        num2= null;
        currOperator = null;
    } else if (value === "DEL") {
        display.textContent = display.textContent.slice(0, -1);
    } else if (value==="="){
        if (num1 && currOperator){
            num2=display.textContent;
            const result = operate(currOperator,num1,num2);
            display.textContent = result === "Error" ? "Error" :(Number.isInteger(result) ? result : result.toFixed(4));
            num1 = result === "Error" ? null : result;
            currOperator=null;
            shouldResetDisplay=true;
        }
    } else{
        if (currOperator && !shouldResetDisplay) {
            num2 = display.textContent;
            const result = operate(currOperator, num1, num2);
            display.textContent = result === "Error" ? "Error" :(Number.isInteger(result) ? result : result.toFixed(4));
            num1 = result === "Error" ? null : result;
        } else {
            num1 = display.textContent === "Error" ? null : display.textContent;
        }
        currOperator = value;
        shouldResetDisplay = true;      
    }
};

buttons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        handleClick(e.target.textContent);
    });
})