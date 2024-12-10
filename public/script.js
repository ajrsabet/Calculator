// Adam Sabet
// SD 230
// 
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


///////////// GLOBAL VARIABLES ////////////
var num1;
var num2;
var answer;
var lastOp;

///////////// EVENT LISTENERS ////////////
// operator buttons
$(".operator-key").on("click", function () {
    let btnText = $(this).text();
    // if (num1) {
    //     math(btnText);
    //     lastOp = btnText;
    // } else {
    //     lastOp = btnText;
    // }
    handleOperatorKey(btnText);
});

// equals button
$("#equals-btn").on("click", function () {
    // let btnText = $(this).text();
    math();
});

// ac button
$("#ac-btn").on("click", function () {
    // num1 = undefined;
    // num2 = undefined;
    // answer = undefined;
    // lastOp = undefined;
    // $("#display").html("");
    // $("#list").empty();
    clearCalculator();
});

// number buttons
$(".number").on("click", function () {
    let btnText = $(this).text();
    handleNumberKey(btnText);
});

// keyboard input
$(document).on("keydown", function (event) {
    const key = event.key;

    // Check if the key is a number (0-9)
    if (!isNaN(key) || key == ".") {
        handleNumberKey(key);
    }

    // Check if the key is an operator (+, -, *, /)
    else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorKey(key);
    }

    // Check if Enter or '=' is pressed to calculate the result
    else if (key === "Enter" || key === "=") {
        event.preventDefault();  // Prevent default Enter behavior 
        math();
    }

    // Check if Escape (or 'AC' on the calculator) is pressed to clear
    else if (key === "Escape") {
        clearCalculator();
    }

    // Check if key is % or +/- for percentage and sign change
    else if (key === "%") {
        lastFunct = "%";
        math();
    } else if (key === "±") {
        lastFunct = "+/-";
        math();
    }
});

////////////////// FUNCTIONS ///////////////////
// Function to handle the math
function math() {
    // parse nums in case of string
    num1 = num1 !== undefined ? parseFloat(num1) : 0;
    num2 = num2 !== undefined ? parseFloat(num2) : 0;

    if (num1) {
        if (lastOp) {
            switch (lastOp) {
                case "+":
                    answer = num2 + num1;
                    break;
                case "-":
                    answer = num2 - num1;
                    break;
                case "x":
                    answer = num2 * num1;
                    break;
                case "/":
                    answer = num2 / num1;
                    break;
                case "+/-":
                    answer = -answer;
                    break;
                case "%":
                    answer = answer / 100;
                    break;
                default:
                    console.log("that didn't work");
                    break;
            }

            // round answer
            answer = roundNum(answer);

            // add equation to history
            $("#list").prepend(`<p>${num2} ${lastOp} ${num1} = ${answer}</p>`)

            // update stored numbers
            num2 = answer;
            num1 = undefined;
        } else {
            answer = num2;
            num2 = num1;
            num1 = undefined;
        }
    } else {
        alert("You need to enter a value before using a function")
    }

}

// Function to handle number key input
function handleNumberKey(key) {
    // Allow a decimal point entry
    if (key === ".") {
        if (!num1) {
            num1 = "0.";  // Start with '0.' if num1 is undefined
        } else if (!num1.toString().includes(".")) {
            num1 = num1.toString() + ".";  // Append decimal if it doesn't already exist
        }
    } else {
        // If key is a number, add it to num1
        if (!num1 || num1 === "0") {
            num1 = key;
        } else {
            num1 = num1.toString() + key;
        }
    }
    $("#display").html(roundNum(num1));
}

// Function to handle operator key input
function handleOperatorKey(key) {
    if (num1) {
        math(key);
        lastOp = key;
    } else {
        lastOp = key;
    }
}

// Function to clear calculator (mapped to AC button and Escape key)
function clearCalculator() {
    num1 = undefined;
    num2 = undefined;
    answer = undefined;
    lastOp = undefined;
    $("#display").html("");
    $("#list").empty();
}

// round number if more than 4 decimals 
function roundNum(value) {
    // Ensure value is a float and check decimal length
    let num = parseFloat(value);
    if (isNaN(num)) return "0";  // Handle undefined or invalid numbers gracefully

    // Check if the number has more than 4 decimal places
    if (num.toString().includes('.') && num.toString().split('.')[1].length > 4) {
        // Round to 4 decimal places if more than 4 decimals
        return num.toFixed(4);
    }

    // Return number as-is if 4 or fewer decimals
    return num.toString();
}