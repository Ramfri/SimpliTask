'use strict';
// Importaciones
import { getSystemTheme } from "../../utilities/dom.js";

// Variables y constantes
const changeThemeBtn = document.getElementById('changeThemeBtn');
const themeSelected = localStorage.getItem('theme') || getSystemTheme();

// Funciones
const enableDarkTheme = () => {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

const enableLightTheme = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
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