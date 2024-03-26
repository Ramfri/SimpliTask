'use strict';
// Importaciones
import { createTask, currentTaskDragged } from '../../components/task.js';
import { getTasks, updateTaskStatus } from '../../services/tasks-manager.js';
import { clearHtml, resizeElement, removeClasses, disableAllTaskPointerEvents, enableAllTaskPointerEvents } from '../../utilities/dom.js';


// Variables y constantes
export const tasksContainer = document.getElementById('tasksContainer');
export const tasksCompletedContainer = document.getElementById('tasksCompletedContainer');

// Funciones
export const loadTasks = (tasks = null) => {
    tasks = tasks ?? getTasks();
    tasks.forEach(task => {
        const [taskHtml, taskContent] = createTask(task);

        if(task.completed) {
            tasksCompletedContainer.appendChild(taskHtml);
        } else {
            tasksContainer.appendChild(taskHtml);
        }

        resizeElement(taskContent);
    });
}

export const addNewTaskToContainer = (task) => {
    const [taskHtml, taskContent] = createTask(task);
    tasksContainer.appendChild(taskHtml);
    resizeElement(taskContent);
}

function eventListeners() {

    tasksCompletedContainer.addEventListener('dragenter', (e) => {
        disableAllTaskPointerEvents(tasksCompletedContainer);
    });

    tasksContainer.addEventListener('dragenter', (e) => {
        disableAllTaskPointerEvents(tasksContainer);
    });

    tasksCompletedContainer.addEventListener('dragleave', (e) => {
        enableAllTaskPointerEvents(tasksCompletedContainer);
    });

    tasksContainer.addEventListener('dragleave', (e) => {
        enableAllTaskPointerEvents(tasksContainer);
    });

    tasksContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tasksCompletedContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tasksCompletedContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const [id, taskHtml, completed] = currentTaskDragged;
        enableAllTaskPointerEvents(tasksCompletedContainer);

        if(!completed) {
            updateTaskStatus(id, true);
            taskHtml.querySelector('input[type="checkbox"]').checked = true;
            tasksCompletedContainer.appendChild(taskHtml);
        }
    });

    tasksContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const [id, taskHtml, completed] = currentTaskDragged;
        enableAllTaskPointerEvents(tasksContainer);

        if(completed) {
            updateTaskStatus(id, false);
            taskHtml.querySelector('input[type="checkbox"]').checked = false;
            tasksContainer.appendChild(taskHtml);
        }
    });
}

document.onload = eventListeners();
