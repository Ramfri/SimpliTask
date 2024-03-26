'use strict';
// Importaciones
import { addTask } from '../../services/tasks-manager.js';
import { enableAutoResize, errorMessage, removeErrorMessage, addClassTemporarily, removeClass } from '../../utilities/dom.js';
import { addNewTaskToContainer } from '../main/tasks-container.js';

// Variables y constantes
const newTask = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const addTaskForm = document.querySelector('.header__newtask');

// Funciones
const setErrorStatus = (message) => {
    errorMessage(message, addTaskForm, 3000);
    addClassTemporarily(addTaskForm, 'error', 3000);
}

const removeErrorStatus = () => {
    removeErrorMessage(addTaskForm);
    removeClass(addTaskForm, 'error');
}

const validTask = (task) => {
    if(task === '' || task.length < 3) {
        setErrorStatus('La tarea debe tener al menos 3 caracteres');
        return false;
    }
    removeErrorStatus();
    return true;
}

const addTaskResults = (result) => {
    if(result.status === 'success') {
        newTask.value = '';
        addClassTemporarily(addTaskForm, 'success', 1000);
        addNewTaskToContainer(result.task);
    } else {
        setErrorStatus(result.message);
    }
}

const addNewTask = () => {
    const task = newTask.value.trim();
    if(!validTask(task)) return;

    const result = addTask(task);
    addTaskResults(result);
}

// Event Listeners
function eventListeners() {
    enableAutoResize(newTask);
    addTaskBtn.addEventListener('click', addNewTask);
}

// Ejecución de código
document.onload = eventListeners();