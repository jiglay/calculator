export default class Calculator {
    constructor(calculator, numbers, operators, result, acc, percentage, sign) {
        this.calculator = document.querySelector(calculator);
        this.numbers = document.querySelectorAll(numbers);
        this.operators = document.querySelectorAll(operators);
        this.result = document.querySelector(result);
        this.acc = document.querySelector(acc);
        this.percentage = document.querySelector(percentage);
        this.sign = document.querySelector(sign);

        this.activeClass = 'active';
        this.arrayNumber = [];
        this.operandOne = undefined;
        this.operandTwo = undefined;
        this.negativeNumber = false;
        this.operator = undefined;
        this.changeScreen = true;
        this.total = 0;

        this.init();
    }

    handleNumber(item) {
        this.acc.innerText = 'C';
        this.operators.forEach(operator => operator.classList.remove(this.activeClass));
        this.arrayNumber.push(item.innerText);

        (this.changeScreen) ? this.result.innerText = item.innerText : this.result.innerText += item.innerText;

        this.changeScreen = false;
    }

    handleOperator(operator) {
        this.acc.innerText = 'C';

        if (!this.operandOne) {
            this.operandOne = this.checkNegative();
        } else {
            this.operandTwo = this.checkNegative();
            this.handleCalculation();
        }

        this.operator = operator.innerText;
        this.operators.forEach(operator => operator.classList.remove(this.activeClass));
        operator.classList.add(this.activeClass);
        this.arrayNumber = [];
        this.changeScreen = true;
    }

    handleCalculation(percentage) {
        const secondNumber = percentage || this.operandTwo;

        if (this.operator === '+') {
            this.total = this.operandOne + secondNumber;
        } else if (this.operator === '-') {
            this.total = this.operandOne - secondNumber;
        } else if (this.operator === '÷') {
            this.total = this.operandOne / secondNumber;
        } else if (this.operator === 'x') {
            this.total = this.operandOne * secondNumber;
        }

        this.total = parseFloat(this.total.toFixed(5));
        this.operandOne = this.total;
        this.operandTwo = undefined;
        this.result.innerText = this.total;
    }

    handleClickCSS(item) {
        item.classList.add('click');
        setTimeout(() => {
            item.classList.remove('click');
        }, 100);
    }

    handleAcC() {
        const lastNumber = +this.arrayNumber.join('');
        this.changeScreen = true;
        this.arrayNumber = [];

        if (this.operandOne && lastNumber) {
            this.result.innerText = this.operandOne;
        } else if (this.operandOne) {
            this.operandOne = 0;
            this.result.innerText = 0;
        } else {
            this.acc.innerText = 'AC';
            this.result.innerText = 0;
            this.operators.forEach(operator => operator.classList.remove(this.activeClass));
            this.operator = undefined;
            this.total = undefined;
            this.negativeNumber = false;
        }
    }

    handlePercentage() {
        let numberPercentage = undefined;

        if (this.operandOne) {
            numberPercentage = this.operandOne * (+this.arrayNumber.join('') / 100);
            this.operandOne = numberPercentage;
            this.result.innerText = numberPercentage;
            this.handleCalculation(numberPercentage);
        } else {
            numberPercentage = +this.arrayNumber.join('') / 100;
            this.arrayNumber = [];
            this.arrayNumber[0] = numberPercentage;
            this.result.innerText = numberPercentage;
        }
    }

    handleSign() {
        this.negativeNumber = true;
        this.changeScreen = true;
        this.result.innerText = `-${this.result.innerText}`;
    }

    checkNegative() {
        const tempNumber = this.negativeNumber ? +this.arrayNumber.join('') * (-1) : +this.arrayNumber.join('');
        this.negativeNumber = false;
        return tempNumber;
    }

    addCalcEvents() {
        this.calculator.addEventListener('click', event => event.preventDefault());
        this.numbers.forEach(number => number.addEventListener('click', () => this.handleNumber(number)));
        this.operators.forEach(operator => operator.addEventListener('click', () => this.handleOperator(operator)));
        this.acc.addEventListener('click', this.handleAcC);
        this.percentage.addEventListener('click', this.handlePercentage);
        this.sign.addEventListener('click', this.handleSign);

        /* handle css */
        this.numbers.forEach(number => number.addEventListener('click', () => this.handleClickCSS(number))); this.acc.addEventListener('click', () => this.handleClickCSS(this.acc));
        this.percentage.addEventListener('click', () => this.handleClickCSS(this.percentage));
        this.sign.addEventListener('click', () => this.handleClickCSS(this.sign));
    }

    bindMethods() {
        this.handleNumber = this.handleNumber.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleClickCSS = this.handleClickCSS.bind(this);
        this.handleAcC = this.handleAcC.bind(this);
        this.handlePercentage = this.handlePercentage.bind(this);
        this.handleSign = this.handleSign.bind(this);
    }

    init() {
        this.bindMethods();
        this.addCalcEvents();
        return this;
    }
}