let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let startDayIndex = 0;
let today = currentDate.getDate();
let isCurrentMonth = true;

function updateCalendar() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById("monthYear").textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    isCurrentMonth = (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear());
    renderDays(daysInMonth);
}

function renderDays(daysInMonth) {
    const daysContainer = document.getElementById("daysContainer");
    daysContainer.innerHTML = "";

    for (let i = startDayIndex; i < Math.min(startDayIndex + 7, daysInMonth); i++) {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i + 1;

        if (isCurrentMonth && (i + 1) === today) {
            dayElement.classList.add("today");
        }

        daysContainer.appendChild(dayElement);
    }
}

function changeMonth(step) {
    currentMonth += step;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    startDayIndex = 0;
    updateCalendar();
}

function changeDays(step) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    startDayIndex += step * 7;

    if (startDayIndex >= daysInMonth) {
        startDayIndex = 0;
    } else if (startDayIndex < 0) {
        startDayIndex = Math.max(0, daysInMonth - 7);
    }
    renderDays(daysInMonth);
}

updateCalendar();