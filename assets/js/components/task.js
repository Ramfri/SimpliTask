
import { updateTaskStatus, deleteTask, updateTaskText, validText, taskAlreadyExists, getTask } from '../services/tasks-manager.js';
import { enableAutoResize, disableAutoResize, countElementsByClass, changeImgSrc, removeElement, changeElementContainer, removeClasses } from '../utilities/dom.js';
import { tasksContainer, tasksCompletedContainer } from '../layout/main/tasks-container.js';

export let currentTaskDragged = null;

export const createTask = ({id, task, completed}) => {
    const taskHtml = taskContainer(id);
    const [checkboxWrapper, checkbox] = taskCheckbox(completed);
    const taskContent = taskTextContent(task);
    const taskOptionsButton = taskOptionsBtn();
    
    taskHtml.appendChild(checkboxWrapper);
    taskHtml.appendChild(taskContent);
    taskHtml.appendChild(taskOptionsButton);

    taskStatusEvent(checkbox, id, taskHtml);
    taskOptionsEvent(taskOptionsButton, id, taskContent, taskHtml);
    taskDragEvent(taskHtml, id, checkbox);

    return [taskHtml, taskContent];
}

// Task Html components
// Task / container
const taskContainer = (id) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task', 'd-flex', 'flex-center');
    taskElement.id = id;
    taskElement.draggable = true;
    return taskElement;
}

// Task / checkbox
const taskCheckbox = (completed) => {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('checkbox-wrapper');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    checkboxWrapper.appendChild(checkbox);
    return [checkboxWrapper, checkbox];
}

// Task / text
const taskTextContent = (task) => {
    const taskContent = document.createElement('textarea');
    taskContent.classList.add('task__text');
    taskContent.readOnly = true;
    taskContent.value = task;
    taskContent.rows = 1;
    return taskContent;
}

// Task / options button
const taskOptionsBtn = () => {
    const taskOptions = document.createElement('button');
    taskOptions.classList.add('task__options');

    const icon = document.createElement('img');
    icon.src = 'assets/icons/options.png';
    icon.classList.add('icon');

    taskOptions.appendChild(icon);
    return taskOptions;
}

// Task / action menu
const taskMenuContainer = () => {
    const menu = document.createElement('div');
    menu.classList.add('task__menu');
    return menu;
}

const menuBtn = (text, iconSrc, classes) => {
    const button = document.createElement('button');
    button.classList.add(...classes);

    const textNode = document.createTextNode(text);
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.classList.add('icon');

    button.appendChild(textNode);
    button.appendChild(icon);
    return button;
}

// Task events
// Task / status event
const taskStatusEvent = (checkbox, id, taskHtml) => {
    checkbox.addEventListener('change', () => {
        const task = getTask(id);
        if( task === null ) return;
        // Si task es valida entonces cambiamos el estado de la tarea y su contenedor
        updateTaskStatus(id, checkbox.checked);
        changeElementContainer(taskHtml, checkbox.checked ? tasksCompletedContainer : tasksContainer);
    });
}

// Task / options event
const taskOptionsEvent = (taskOptionsButton, id, taskContent, taskHtml) => {
    taskOptionsButton.addEventListener('click', () => {

        // Si hay 2 menús abiertos significa que esta abierto un submenú
        if(countElementsByClass(taskHtml, 'task__menu') > 1) return;
        
        // Si ya hay un menú abierto, lo cerramos y cambiamos la imagen del botón
        if(countElementsByClass(taskHtml, 'task__menu') === 1) {
            removeElement(taskHtml.querySelector('.task__menu'));
            changeImgSrc(taskOptionsButton.querySelector('.icon'), 'assets/icons/options.png');
            return;
        }

        // Si no hay menús abiertos, abrimos uno y cambiamos la imagen del botón
        changeImgSrc(taskOptionsButton.querySelector('.icon'), 'assets/icons/cancel.png');

        const menu = taskMenuContainer();
        const editButton = menuBtn('Edit', 'assets/icons/edit.png', ['btn', 'btn-edit']);
        const deleteButton = menuBtn('Delete', 'assets/icons/delete.png', ['btn', 'btn-warning']);
        
        deleteButton.addEventListener('click', () => {
            taskDeleteEvent(id, taskHtml);
        });

        editButton.addEventListener('click', () => {
            if(!taskContent.readOnly) return;
            taskEditEvent(taskContent, id);
        });

        menu.appendChild(editButton);
        menu.appendChild(deleteButton);
        taskHtml.appendChild(menu);
    });
}

// Task delete event
const taskDeleteEvent = (id, taskHtml) => {
    const task = getTask(id);
    if( task === null ) return;

    const deleteOptionsMenu = taskMenuContainer();
    const confirmButton = menuBtn('Delete', 'assets/icons/delete.png', ['btn', 'btn-danger']);
    const cancelButton = menuBtn('Cancel', 'assets/icons/cancel.png', ['btn', 'btn-warning']);

    confirmButton.addEventListener('click', () => {
        deleteTask(id);
        taskHtml.remove();
    });

    cancelButton.addEventListener('click', () => {
        deleteOptionsMenu.remove();
    });

    deleteOptionsMenu.appendChild(confirmButton);
    deleteOptionsMenu.appendChild(cancelButton);
    taskHtml.appendChild(deleteOptionsMenu);
}

// Task edit event
const taskEditEvent = (taskContent, id) => {
    const task = getTask(id);
    if( task === null ) return;
    
    enableEditMode(taskContent, task);
    const editOptionsMenu = taskMenuContainer();
    const saveButton = menuBtn('Save', 'assets/icons/save.png', ['btn', 'btn-success']);
    const cancelButton = menuBtn('Cancel', 'assets/icons/cancel.png', ['btn', 'btn-warning']);

    saveButton.addEventListener('click', () => {
        const newTaskText = taskContent.value.trim();
        if(!validText(newTaskText) || taskAlreadyExists(newTaskText)) return;
        disableEditMode(taskContent, newTaskText);
        updateTaskText(id, newTaskText);
        editOptionsMenu.remove();
    });

    cancelButton.addEventListener('click', () => {
        disableEditMode(taskContent, task);
        editOptionsMenu.remove();
    });

    editOptionsMenu.appendChild(saveButton);
    editOptionsMenu.appendChild(cancelButton);
    taskContent.parentNode.appendChild(editOptionsMenu);
}

const enableEditMode = (taskContent, text) => {
    taskContent.value = text;
    taskContent.readOnly = false;
    taskContent.classList.add('edit');
    taskContent.focus();
    enableAutoResize(taskContent);
}

const disableEditMode = (taskContent, text) => {
    taskContent.value = text;
    taskContent.readOnly = true;
    taskContent.classList.remove('edit');
    disableAutoResize(taskContent);
}

const taskDragEvent = (taskHtml, id, checkbox) => {
    taskHtml.addEventListener('dragstart', (e) => {
        if(currentTaskDragged !== null) return;
        currentTaskDragged = [id, taskHtml, checkbox.checked];
        taskHtml.classList.add('dragging');
    });

    taskHtml.addEventListener('dragend', (e) => {
        currentTaskDragged = null;
        taskHtml.classList.remove('dragging');
    });
};

