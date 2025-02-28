document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.getElementById("days");
  const yearSpan = document.getElementById("year");
  const monthSpan = document.getElementById("month");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");

  let currentDate = new Date();
  const today = new Date();

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  function generateCalendar(date) {
    daysContainer.innerHTML = "";
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
      const dayDiv = document.createElement("div");
      dayDiv.textContent = daysInPrevMonth - i;
      dayDiv.classList.add("text-gray-400", "p-3", "border-gray-300");
      daysContainer.appendChild(dayDiv);
    }

    // Días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = day;
      dayDiv.classList.add("p-3", "border-gray-300");

      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate()
      ) {
        dayDiv.classList.add(
          "bg-essentials-primary",
          "text-white",
          "rounded-full"
        );
      }

      daysContainer.appendChild(dayDiv);
    }

    // Días del mes siguiente
    const nextMonthStart = (firstDayOfWeek + lastDayOfMonth.getDate()) % 7;
    if (nextMonthStart !== 0) {
      for (let i = 1; i <= 7 - nextMonthStart; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = i;
        dayDiv.classList.add("text-gray-400", "p-3", "border-gray-300");
        daysContainer.appendChild(dayDiv);
      }
    }
  }

  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });

  nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });

  generateCalendar(currentDate);
});



function generarFechas() {
  const hoy = new Date();
  const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
  const opcionesDia = { weekday: "long" };

  let html = "";
  for (let i = 0; i < 7; i++) {
    let fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    let diaSemana = fecha.toLocaleDateString("es-ES", opcionesDia);
    let fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha);

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

  document.getElementById("fechas").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", generarFechas);


let currentDate = new Date();
let userStartTime = 8;
let userEndTime = 22;
let selectedDate = "";
let selectedTime = "";

function populateTimeSelectors() {
  const startSelect = document.getElementById("userStartTime");
  const endSelect = document.getElementById("userEndTime");
  startSelect.innerHTML = "";
  endSelect.innerHTML = "";

  for (let hour = 0; hour <= 23; hour++) {
    for (let minute of [0, 30]) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12; // Convierte 0 y 12 a 12, el resto lo deja igual
      const time = `${displayHour}:${minute === 0 ? "00" : "30"} ${period}`;

      const value = hour + minute / 60; // Mantiene el valor en formato 24h para la lógica interna

      startSelect.innerHTML += `<option value="${value}">${time}</option>`;
      endSelect.innerHTML += `<option value="${value}">${time}</option>`;
    }
  }
}
function setSchedule() {
    userStartTime = parseFloat(document.getElementById("userStartTime").value);
    userEndTime = parseFloat(document.getElementById("userEndTime").value);
  
    if (userStartTime >= userEndTime) {
      alert("La hora de inicio debe ser menor que la hora de fin.");
      return;
    }
  
    // Guardar en localStorage
    localStorage.setItem("userStartTime", userStartTime);
    localStorage.setItem("userEndTime", userEndTime);
  
    document.getElementById("schedule").classList.remove("hidden");
    renderSchedule();
  }
  
  // Función para cargar valores guardados
  function loadScheduleSettings() {
    const savedStartTime = localStorage.getItem("userStartTime");
    const savedEndTime = localStorage.getItem("userEndTime");
  
    if (savedStartTime && savedEndTime) {
      userStartTime = parseFloat(savedStartTime);
      userEndTime = parseFloat(savedEndTime);
  
      document.getElementById("userStartTime").value = userStartTime;
      document.getElementById("userEndTime").value = userEndTime;
  
      document.getElementById("schedule").classList.remove("hidden");
      renderSchedule();
    }
  }
  
  // Cargar configuración al iniciar la página
  document.addEventListener("DOMContentLoaded", loadScheduleSettings);

  
  
  let reservations = {}; // Definir globalmente

  // Cargar reservas al iniciar la página
  function loadReservations() {
      const storedReservations = localStorage.getItem("reservations");
  
      if (storedReservations) {
          reservations = JSON.parse(storedReservations);
          console.log("✅ Reservas cargadas:", reservations); // Debug
      } else {
          reservations = {}; // Si no hay reservas, inicializa vacío
          console.log("⚠️ No hay reservas almacenadas.");
      }
  }
  
  function saveReservation() {
    const title = document.getElementById("title").value;
    const user = document.getElementById("user").value;
    if (!title || !user) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    if (!reservations[selectedDate]) reservations[selectedDate] = {};
    reservations[selectedDate][selectedTime] = { title, user };
    localStorage.setItem("reservations", JSON.stringify(reservations));
    closeModal();
    renderSchedule();
  }
  
  // Llamar a loadReservations() antes de renderizar
  document.addEventListener("DOMContentLoaded", () => {
      loadReservations();
      renderSchedule(); // Renderizar el calendario con las reservas cargadas
  });
  
  function addReservation(date, time, title, user) {
    const today = new Date();
    const selectedDate = new Date(date);

    // Elimina la hora para comparar solo la fecha
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert("No puedes hacer reservas en días pasados.");
        return;
    }

    if (!reservations[date]) {
        reservations[date] = {};
    }

    reservations[date][time] = { title, user };
    saveReservation(); // Guardar cambios en localStorage
    renderSchedule(); // Volver a dibujar el calendario con la nueva reserva
}

  function deleteReservation(date, time) {
    const today = new Date();
    const selectedDate = new Date(date);

    // Evita eliminar o reservar fechas pasadas
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
        alert("No puedes gestionar reservas en fechas pasadas.");
        return;
    }

    if (reservations[date] && reservations[date][time]) {
        delete reservations[date][time];

        // Si el día ya no tiene reservas, eliminarlo del objeto
        if (Object.keys(reservations[date]).length === 0) {
            delete reservations[date];
        }

        localStorage.setItem("reservations", JSON.stringify(reservations));
        alert("Reserva eliminada correctamente.");
        renderSchedule(); // Vuelve a renderizar el calendario
    } else {
        alert("No hay reserva en ese horario.");
    }
}


function renderSchedule() {
  const schedule = document.getElementById("days_calendario");
  const currentWeek = document.getElementById("currentWeek");
  const horaSpan = document.getElementById("horaSpan"); // Contenedor de horas

  // Limpiar contenido previo
  schedule.innerHTML = "";
  horaSpan.innerHTML = ""; // Limpiar antes de agregar nuevas horas

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Mostrar la semana actual
  currentWeek.textContent = `${startDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} - ${endDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

  // 📌 Generar solo una vez la columna de horas (lado izquierdo)
  const horasGeneradas = new Set();
  for (let hour = userStartTime; hour < userEndTime; hour += 0.5) {
    const h = Math.floor(hour);
    const m = hour % 1 === 0 ? "00" : "30";

    // Convertir a formato 12 horas con AM/PM
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12; // Convierte 0 y 12 a 12, el resto lo deja igual
    const time = `${displayHour}:${m} ${period}`;

    if (!horasGeneradas.has(time)) {
      const horaElement = document.createElement("div");
      horaElement.className =
        "min-h-[40px] h-full flex justify-center items-center text-center w-full";
      horaElement.innerText = time;
      horaSpan.appendChild(horaElement);
      horasGeneradas.add(time);
    }
  }

  // 📌 Generar los días de la semana con sus respectivas horas
  for (let d = 0; d < 7; d++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + d);
    const dateKey = `${day.getFullYear()}-${
      day.getMonth() + 1
    }-${day.getDate()}`;

    const dayDiv = document.createElement("div");
    dayDiv.className = "border-x border-secundary-light";
    dayDiv.innerHTML = `<div class="font-bold p-2">${day.toLocaleDateString(
      "es-ES",
      { weekday: "long", day: "numeric" }
    )}</div>`;

    for (let hour = userStartTime; hour < userEndTime; hour += 0.5) {
      const h = Math.floor(hour);
      const m = hour % 1 === 0 ? "00" : "30";
      const time = `${h}:${m}`;

      const hourDiv = document.createElement("div");
      hourDiv.className =
        "min-h-[40px] flex justify-center items-center text-center cursor-pointer border border-secundary-light p-0 m-0";
      hourDiv.onclick = () => openModal(dateKey, time);

      // Lista de colores con borde izquierdo y transparencia
      const eventColors = [
        "border-l-[4px] border-l-red-500 bg-red-500/30 text-red-700",
        "border-l-[4px] border-l-blue-500 bg-blue-500/30 text-blue-700",
        "border-l-[4px] border-l-green-500 bg-green-500/30 text-green-700",
        "border-l-[4px] border-l-yellow-500 bg-yellow-500/30 text-yellow-700",
        "border-l-[4px] border-l-purple-500 bg-purple-500/20 text-purple-700",
        "border-l-[4px] border-l-pink-500 bg-pink-500/30 text-pink-700",
        "border-l-[4px] border-l-indigo-500 bg-indigo-500/30 text-indigo-700",
        "border-l-[4px] border-l-teal-500 bg-teal-500/30 text-teal-700",
        "border-l-[4px] border-l-orange-500 bg-orange-500/30 text-orange-700",
        "border-l-[4px] border-l-cyan-500 bg-cyan-500/30 text-cyan-700",
        "border-l-[4px] border-l-rose-500 bg-rose-500/30 text-rose-700",
        "border-l-[4px] border-l-lime-500 bg-lime-500/30 text-lime-700",
        "border-l-[4px] border-l-amber-500 bg-amber-500/30 text-amber-700",
        "border-l-[4px] border-l-emerald-500 bg-emerald-500/30 text-emerald-700",
        "border-l-[4px] border-l-fuchsia-500 bg-fuchsia-500/30 text-fuchsia-700",
        "border-l-[4px] border-l-violet-500 bg-violet-500/30 text-violet-700",
        "border-l-[4px] border-l-sky-500 bg-sky-500/30 text-sky-700",
        "border-l-[4px] border-l-gray-500 bg-gray-500/30 text-gray-700",
        "border-l-[4px] border-l-stone-500 bg-stone-500/30 text-stone-700",
        "border-l-[4px] border-l-neutral-500 bg-neutral-500/30 text-neutral-700",
        "border-l-[4px] border-l-slate-500 bg-slate-500/30 text-slate-700",
        "border-l-[4px] border-l-zinc-500 bg-zinc-500/30 text-zinc-700",
      ];

      // Objeto para almacenar los colores asignados a cada evento
      const assignedColors = {};

      if (reservations[dateKey] && reservations[dateKey][time]) {
        // Si el evento ya tiene un color, usarlo; si no, asignar uno nuevo
        if (!assignedColors[`${dateKey}-${time}`]) {
          // Filtrar colores que ya están en uso
          const availableColors = eventColors.filter(
            (color) => !Object.values(assignedColors).includes(color)
          );

          // Seleccionar un color aleatorio de los disponibles
          const randomColor =
            availableColors.length > 0
              ? availableColors[
                  Math.floor(Math.random() * availableColors.length)
                ]
              : eventColors[Math.floor(Math.random() * eventColors.length)]; // Si se acaban, reutilizar

          assignedColors[`${dateKey}-${time}`] = randomColor; // Guardar el color asignado
        }

        const eventColor = assignedColors[`${dateKey}-${time}`]; // Obtener el color del evento
        hourDiv.classList.add(...eventColor.split(" ")); // Aplicar el color desglosado

        hourDiv.innerHTML += `
      <div class="text-[14px] gap-3 flex items-center justify-between ">
        <p> ${reservations[dateKey][time].title} - ${reservations[dateKey][time].user} </p>
        <button onclick="deleteReservation('${dateKey}', '${time}')" class="flex items-center justify-between">
          <span class="text-[16px] material-symbols-rounded p-0">close</span>
        </button>
      </div>
    `;
      }

      dayDiv.appendChild(hourDiv);
    }
    schedule.appendChild(dayDiv);
  }

  
}

// Cargar reservas y renderizar el calendario solo después de que se hayan cargado
loadReservations();
window.addEventListener("load", renderSchedule);


function openModal(date, time) {
  selectedDate = date;
  selectedTime = time;

  document.getElementById("modalDate").textContent = `${date}`;
  document.getElementById("modalTime").textContent = `${time}`;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}



function clearOldReservations() {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  
    for (let dateKey in reservations) {
      if (dateKey < todayKey) {
        delete reservations[dateKey]; // Eliminar eventos pasados
      }
    }
  
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  
    for (let dateKey in reservations) {
      if (dateKey < todayKey) {
        delete reservations[dateKey]; // Eliminar eventos pasados
      }
    }
  
    localStorage.setItem("reservations", JSON.stringify(reservations));

  
  // Ejecutar esta función al cargar la página
  document.addEventListener("DOMContentLoaded", clearOldReservations);

  function changeWeek(offset) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Eliminar la hora para comparar solo la fecha
  
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
  
    // No permitir ir a semanas anteriores a la actual
    if (newDate < today) {
      return;
    }
  
    currentDate = newDate;
    localStorage.setItem("currentDate", currentDate.toISOString()); // Guardar la fecha en localStorage
    renderSchedule();
  }
  



populateTimeSelectors();
