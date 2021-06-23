import ToggleLightDarkMode from './light-dark-mode.js';
import Calculator from './calculator.js';

const mode = new ToggleLightDarkMode('.switch a img', './img/switch-light.png', './img/switch-dark.png', '.calculator', '.result span', '.settings', '.numbers', '.operators');

const calculator = new Calculator('.calculator', '.numbers', '.operators', '.result span', '.acc', '.percentage', '.sign');