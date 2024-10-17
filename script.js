// 3. Calculator
// Create a program that functions as a calculator. 
// The program stores each user input one at a time until an "=" sign is input. 
// At which point the values input should be processed as a calculator would. 
// 1000 + 5 * 3 =
// Assume this is input one at a time. [1,0,0,0,"+",5,"*",3,"="] 

// Order of operations must be considered. Parenthesis and Exponents need not be handled nor do you have to handle decimals. 
// Major Extra credit if you handle the PE in PEMDAS and add decimals.

// Values it must handle. 
// [0,1,2,3,4,5,6,7,8,9,"+","-","/","*","="]

// event controller

// addition
function addition(num1, num2) {
    console.log("addition")
    return num1 + num2;
}

// subtraction
function subtraction(num1, num2) {
    console.log("subtraction")
    return num1 - num2;
}

// division
function division(num1, num2) {
    console.log("division")
    return num1 / num2;
}

// multiplication
function multiplication(num1, num2) {
    console.log("multiplication")
    return num1 * num2;
}

// event listener for submit button
        // Select the button element
        const button = document.getElementById('equationButton');

        // Add an event listener to the button for a 'click' event
        button.addEventListener('click', function() {
            var num1 = document.getElementById("value1").value;
            var num2 = document.getElementById("value2").value;
            var modifier = document.getElementById("modifier").value;
            var answer;

            switch (modifier) {
                case "+":
                    answer = addition(num1, num2);
                    break;
                case "-":
                    answer = subtraction(num1, num2);
                    
                    break;
                case "*":
                    answer = multiplication(num1, num2);
                    
                    break;
                case "/":
                    answer = division(num1, num2);
                    
                    break;
            
                default:
                    alert("that didn't work");
                    break;
            }

            document.getElementById("answer").textContent=answer;
        });