'use strict';

const headerTime = document.querySelector('.header__time');

const formatDate = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return [days[date.getDay()], date.getDate(), months[date.getMonth()]];
}

const displayDate = () => {
    const date = new Date();
    const [day, dayNum, month] = formatDate(date);
    headerTime.innerHTML = `<h2>${day} ${dayNum}, <span class="text-disabled">${month}</span></h2>`;
}

const setDateUpdate = () => {
    const date = new Date();
    const minutes = 61 - date.getMinutes();
    const hours = 23 - date.getHours();
    const timeInMiliseconds = (minutes * 60 * 1000) + (hours * 60 * 60 * 1000);

    setTimeout(() => {
        displayDate();
        setDateUpdate();
    }, timeInMiliseconds);
}

function eventListeners() {
    displayDate();
    setDateUpdate();
}


document.onload = eventListeners();