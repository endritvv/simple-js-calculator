class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    clearLast() {
        this.currentOperand = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    negative() {
        this.currentOperand = this.currentOperand * -1;

    }
    divideByOne() {
        this.currentOperand = 1 / this.currentOperand;

    }
    squareRoot() {
        this.currentOperand = Math.sqrt(this.currentOperand);

    }
    power() {
        this.currentOperand = this.currentOperand * this.currentOperand;

    }
    percentage() {
        this.currentOperand = (this.previousOperand / 100) * this.currentOperand;

    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const clearButton = document.querySelector("[data-clear]");
const negativeButton = document.querySelector("[data-negative]");
const divideButton = document.querySelector("[data-divide]");
const squareButton = document.querySelector("[data-square]");
const powerButton = document.querySelector("[data-power]");
const percentageButton = document.querySelector("[data-percentage]");

const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});
clearButton.addEventListener("click", button => {
    calculator.clearLast();
    calculator.updateDisplay();
});
negativeButton.addEventListener("click", button => {
    calculator.negative();
    calculator.updateDisplay();
});
divideButton.addEventListener("click", button => {
    calculator.divideByOne();
    calculator.updateDisplay();
});
squareButton.addEventListener("click", button => {
    calculator.squareRoot();
    calculator.updateDisplay();
});
powerButton.addEventListener("click", button => {
    calculator.power();
    calculator.updateDisplay();
});
percentageButton.addEventListener("click", button => {
    calculator.percentage();
    calculator.updateDisplay();
});