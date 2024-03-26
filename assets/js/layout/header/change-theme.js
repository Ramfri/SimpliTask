'use strict';
// Importaciones
import { getSystemTheme, changeImgSrc } from "../../utilities/dom.js";

// Variables y constantes
const changeThemeBtn = document.getElementById('changeThemeBtn');
const themeSelected = localStorage.getItem('theme') || getSystemTheme();
const themeIcon = document.querySelector('#changeThemeBtn img');

// Funciones
const enableDarkTheme = () => {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    changeImgSrc(themeIcon, 'assets/icons/sun.png');
}

const enableLightTheme = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    changeImgSrc(themeIcon, 'assets/icons//moon.png');
}

// Event Listeners
function eventListeners() {
    changeThemeBtn.addEventListener('click', () => {
        const darkEnabled = document.body.classList.contains('dark');
        darkEnabled ? enableLightTheme() : enableDarkTheme();
    });
}

// Ejecución de código
document.addEventListener('DOMContentLoaded', () => {
    if(themeSelected === 'dark') enableDarkTheme();
    eventListeners();
});