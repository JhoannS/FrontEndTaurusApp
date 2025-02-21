function actualizarFechaHora() {
    const fecha = new Date();

    // Meses en español
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtener componentes de la fecha
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    // Obtener componentes de la hora
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");
    const periodo = horas >= 12 ? "Pm" : "Am";

    // Convertir formato 24h a 12h
    if (horas > 12) {
        horas -= 12;
    } else if (horas === 0) {
        horas = 12;
    }

    // Saludo según la hora
    let saludo;
    if (fecha.getHours() < 12) {
        saludo = "¡Buenos días!";
    } else if (fecha.getHours() < 18) {
        saludo = "¡Buenas tardes!";
    } else {
        saludo = "¡Buenas noches!";
    }

    // Actualizar el contenido de los divs en tiempo real
    document.getElementById("dia").innerText = dia;
    document.getElementById("mes").innerText = mes;
    document.getElementById("anio").innerText = año;
    document.getElementById("hora").innerText = `${horas}:${minutos}:${segundos} ${periodo}`;
    document.getElementById("saludo").innerText = saludo;
}

// Llamar a la función de inmediato y luego actualizar cada segundo
setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();