export default class ToggleLightDarkMode {
    constructor(button, srcLight, srcDark, calculator, result, settings, numbers, operators) {
        this.button = document.querySelector(button);
        this.srcLight = srcLight;
        this.srcDark = srcDark;
        this.calculator = document.querySelector(calculator);
        this.result = document.querySelector(result);
        this.settings = document.querySelectorAll(settings);
        this.numbers = document.querySelectorAll(numbers);
        this.operators = document.querySelectorAll(operators);
        this.activeClass = 'light';
        this.init();
    }

    onClick(event) {
        event.preventDefault();
        // const stringLight = (window.location.href + this.srcLight).replace('/index.html.', '');
        // const stringDark = (window.location.href + this.srcDark).replace('/index.html.', '');

        const stringLight = (window.location.href + this.srcLight).replace('./img', '/img');
        const stringDark = (window.location.href + this.srcDark).replace('./img', '/img');
        console.log(`
        ${stringLight}
        ${stringDark}`);

        if (this.button.src === stringLight)
            this.button.src = this.srcDark;
        else if (this.button.src === stringDark)
            this.button.src = this.srcLight;

        this.changeColor();
    }

    changeColor() {
        this.calculator.classList.toggle(this.activeClass);
        this.result.classList.toggle(this.activeClass);

        this.changeArrays(this.settings);
        this.changeArrays(this.numbers);
        this.changeArrays(this.operators);
    }

    changeArrays(itemArray) {
        itemArray.forEach(item => item.classList.toggle(this.activeClass));
    }

    addEventMode() {
        this.button.addEventListener('click', this.onClick);
    }

    bindMethods() {
        this.onClick = this.onClick.bind(this);
    }

    init() {
        this.bindMethods();
        this.addEventMode();
        return this;
    }
}