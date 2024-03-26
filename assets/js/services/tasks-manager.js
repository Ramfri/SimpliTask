'use strict';

// Variables y constantes
const tasksDatabase = JSON.parse(localStorage.getItem('tasksDb')) || [];

// Funciones
const autoSave = () => {
    localStorage.setItem('tasksDb', JSON.stringify(tasksDatabase));
}

export const getTasks = () => [...tasksDatabase];

export const getTask = (id) => {
    const result = tasksDatabase.find(task => task.id === id);
    return result ? result.task : null;
}

export const updateTaskStatus = (id, status) => {
    const task = tasksDatabase.find(task => task.id === id);
    if(!task) return;

    task.completed = status;
    autoSave();
}

export const updateTaskText = (id, text) => {
    const task = tasksDatabase.find(task => task.id === id);
    if(!task) return;

    task.task = text;
    autoSave();
}

export const deleteTask = (id) => {
    const taskIndex = tasksDatabase.findIndex(task => task.id === id);
    if(taskIndex === -1) return;

    tasksDatabase.splice(taskIndex, 1);
    autoSave();
}

const generateId = () => Date.now().toString();

export const validText = (text) => {
    return text.trim().length >= 3;
}

export const taskAlreadyExists = (task) => {
    return tasksDatabase.some(t => t.task === task);
}

export const addTask = (task) => {
    if(taskAlreadyExists(task)) {
        return {
            status: 'error',
            message: 'La tarea ya existe'
        };
    };

    const newTask = addTaskProcess(task);
    return {
        status: 'success',
        message: 'Tarea añadida',
        task: newTask,
    };
}

const addTaskProcess = (task) => {
    task = {
        id: generateId(),
        task,
        completed: false,
    };
    tasksDatabase.push(task);
    autoSave();
    return task;
}