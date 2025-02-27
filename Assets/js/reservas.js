document.addEventListener('DOMContentLoaded', () => {
    const daysContainer = document.getElementById('days');
    const yearSpan = document.getElementById('year');
    const monthSpan = document.getElementById('month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();
    const today = new Date();

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    function generateCalendar(date) {
        daysContainer.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();

        monthSpan.textContent = meses[month];
        yearSpan.textContent = year;

        // Días del mes anterior
        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = daysInPrevMonth - i;
            dayDiv.classList.add('text-gray-400', 'p-3', 'border-gray-300');
            daysContainer.appendChild(dayDiv);
        }

        // Días del mes actual
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.classList.add('p-3', 'border-gray-300');

            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayDiv.classList.add('bg-essentials-primary', 'text-white', 'rounded-full');
            }

            daysContainer.appendChild(dayDiv);
        }

        // Días del mes siguiente
        const nextMonthStart = (firstDayOfWeek + lastDayOfMonth.getDate()) % 7;
        if (nextMonthStart !== 0) {
            for (let i = 1; i <= (7 - nextMonthStart); i++) {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = i;
                dayDiv.classList.add('text-gray-400', 'p-3', 'border-gray-300');
                daysContainer.appendChild(dayDiv);
            }
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    generateCalendar(currentDate);
});


function generarFechas() {
    const hoy = new Date();
    const opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const opcionesDia = { weekday: 'long' };
    
    let html = '';
    for (let i = 0; i < 7; i++) {
        let fecha = new Date();
        fecha.setDate(hoy.getDate() + i);
        
        let diaSemana = fecha.toLocaleDateString('es-ES', opcionesDia);
        let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        
        // Capitaliza la primera letra del día de la semana
        diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
        
        html += `

        <h4 class="">${diaSemana}: ${fechaFormateada}</h4>
        <div class="flex items-center gap-2">
        <div class="h-4 w-4 shadow-essentials bg-essentials-primary rounded-full"></div>
        <h1>Hola</h1>
        </div>
        
        
        \n`;
    }
    
    document.getElementById('fechas').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', generarFechas);


let currentDate = new Date();
let reservations = JSON.parse(localStorage.getItem('reservations')) || {};
let userStartTime = 8;
let userEndTime = 22;
let selectedDate = '';
let selectedTime = '';

function populateTimeSelectors() {
    const startSelect = document.getElementById('userStartTime');
    const endSelect = document.getElementById('userEndTime');
    startSelect.innerHTML = '';
    endSelect.innerHTML = '';
    
    for (let hour = 0; hour <= 23; hour++) {
        for (let minute of [0, 30]) {
            const time = `${hour}:${minute === 0 ? '00' : '30'}`;
            startSelect.innerHTML += `<option value="${hour + minute / 60}">${time}</option>`;
            endSelect.innerHTML += `<option value="${hour + minute / 60}">${time}</option>`;
        }
    }
}

function setSchedule() {
    userStartTime = parseFloat(document.getElementById('userStartTime').value);
    userEndTime = parseFloat(document.getElementById('userEndTime').value);
    
    if (userStartTime >= userEndTime) {
        alert('La hora de inicio debe ser menor que la hora de fin.');
        return;
    }
    
    document.getElementById('schedule').classList.remove('hidden');
    renderSchedule();
}

function renderSchedule() {
    const schedule = document.getElementById('days_calendario');
    const currentWeek = document.getElementById('currentWeek');
    schedule.innerHTML = '';
    
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    currentWeek.textContent = `${startDate.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })} - ${endDate.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    
    for (let d = 0; d < 7; d++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + d);
        const dateKey = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'p-4 border rounded-lg bg-gray-100';
        dayDiv.innerHTML = `<div class="font-bold">${day.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}</div>`;
        
        for (let hour = userStartTime; hour < userEndTime; hour += 0.5) {
            const h = Math.floor(hour);
            const m = hour % 1 === 0 ? '00' : '30';
            const time = `${h}:${m}`;
            const hourDiv = document.createElement('div');
            hourDiv.className = 'p-2 text-center border rounded-lg cursor-pointer bg-gray-200';
            hourDiv.onclick = () => openModal(dateKey, time);
            hourDiv.innerHTML = `<span class="block">${time}</span>`;
            
            if (reservations[dateKey] && reservations[dateKey][time]) {
                hourDiv.classList.add('bg-green-300');
                hourDiv.innerHTML += `<div class="text-xs bg-white p-1 mt-1 rounded">${reservations[dateKey][time].title} - ${reservations[dateKey][time].user} <button onclick="deleteReservation('${dateKey}', '${time}')" class="ml-2 text-red-500">❌</button></div>`;
            }
            
            dayDiv.appendChild(hourDiv);
        }
        schedule.appendChild(dayDiv);
    }
}
function openModal(date, time) {
    selectedDate = date;
    selectedTime = time;
    document.getElementById('modalDate').textContent = `Fecha: ${date}`;
    document.getElementById('modalTime').textContent = `Hora: ${time}`;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function saveReservation() {
    const title = document.getElementById('title').value;
    const user = document.getElementById('user').value;
    if (!title || !user) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    if (!reservations[selectedDate]) reservations[selectedDate] = {};
    reservations[selectedDate][selectedTime] = { title, user };
    localStorage.setItem('reservations', JSON.stringify(reservations));
    closeModal();
    renderSchedule();
}

function changeWeek(offset) {
    currentDate.setDate(currentDate.getDate() + offset * 7);
    renderSchedule();
}


function deleteReservation(dateKey, time) {
    if (confirm("¿Seguro que quieres eliminar esta reserva?")) {
        delete reservations[dateKey][time];
        if (Object.keys(reservations[dateKey]).length === 0) {
            delete reservations[dateKey];
        }
        localStorage.setItem('reservations', JSON.stringify(reservations));
        renderSchedule();
    }
}

populateTimeSelectors();