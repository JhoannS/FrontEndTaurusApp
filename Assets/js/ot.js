let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let today = currentDate.getDate();
let startDayIndex = today - 1; // Comienza desde el día actual
const daysToShow = 16; // Número de días a mostrar

function updateCalendar() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById("monthYear").textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    renderDays(daysInMonth);
}

function renderDays(daysInMonth) {
    const daysContainer = document.getElementById("daysContainer");
    daysContainer.innerHTML = "";

    for (let i = startDayIndex; i < Math.min(startDayIndex + daysToShow, daysInMonth); i++) {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day", "bg-transparent", "text-mono-negro", "font-bold");
        dayElement.textContent = i + 1;

        if (i + 1 === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            dayElement.classList.add("text-red-400");
        }

        daysContainer.appendChild(dayElement);
    }
}

function changeDays(step) {
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    startDayIndex += step * daysToShow;

    // Si superamos los días del mes, avanzamos al siguiente mes
    while (startDayIndex >= daysInMonth) {
        startDayIndex -= daysInMonth;
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    // Si retrocedemos más allá del inicio del mes, retrocedemos un mes
    while (startDayIndex < 0) {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        startDayIndex += daysInMonth;
    }

    updateCalendar();
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

    // ✅ Al cambiar de mes, reiniciar el índice al primer día
    startDayIndex = 0;
    
    updateCalendar();
}

updateCalendar();
