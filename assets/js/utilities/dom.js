
export const errorMessage = (message, element, timeout) => {
    const error = document.createElement('p');
    error.textContent = message;
    error.classList.add('error');
    element.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, timeout || 3000);
}

export const removeErrorMessage = (element) => {
    const error = element.querySelector('.error');
    if(error) error.remove();
}

export const addClass = (element, className) => {
    element.classList.add(className);
}

export const removeClass = (element, className) => {
    element.classList.remove(className);
}

export const removeClasses = (element, classes) => {
    if(!element || !classes) return;
    classes.forEach(className => element.classList.remove(className));
}

export const addClassTemporarily = (element, className, timeout) => {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, timeout || 3000);
}

export const clearHtml = (element) => {
    while(element.firstChild) {
        element.firstChild.remove();
    }
}

export const resize = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

export const enableAutoResize = (element) => {
    element.addEventListener('input', () => resize(element));
}

export const disableAutoResize = (element) => {
    element.removeEventListener('input', () => resize(element));
}

export const removeElement = (element) => {
    if(!element) return;
    element.remove();
}

export const changeImgSrc = (element, src) => {
    if(!element) return;
    element.src = src;
}

export const countElementsByClass = (element, className) => {
    return element.getElementsByClassName(className).length;
}

export const resizeElement = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

export const changeElementContainer = (element, container) => {
    if(!element || !container) return;
    container.appendChild(element);
}

export const disableAllTaskPointerEvents = (container) => {
    const tasks = container.getElementsByClassName('task');
    if(!tasks) return;
    for(const task of tasks) {
        task.style.pointerEvents = 'none';
    }
}

export const enableAllTaskPointerEvents = (container) => {
    const tasks = container.getElementsByClassName('task');
    if(!tasks) return;
    for(const task of tasks) {
        task.style.pointerEvents = 'auto';
    }
}

export const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
