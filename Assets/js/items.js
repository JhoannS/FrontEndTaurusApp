function stock() {
    let cantidades = document.querySelectorAll(".cantidad");

    cantidades.forEach(elemento => {
        let valor = parseInt(elemento.textContent.trim().replace(/\D/g, "")); // Elimina todo excepto números

        if (valor <= 9) {
            elemento.classList.add("bg-semaforo-rojo", "px-2", "py-1", "rounded-lg", "font-bold");
        } else if (valor >= 10 && valor <= 14) {
            elemento.classList.add("bg-semaforo-amarillo", "px-2", "py-1", "rounded-lg", "font-bold");
        } else if (valor >= 15) {
            elemento.classList.add("bg-semaforo-verde", "px-2", "py-1", "rounded-lg", "font-bold");
        }
    });
}
function estado() {
    let estados = document.querySelectorAll(".estado");

    estados.forEach(actual => {
        let estadoActual = actual.textContent.trim(); // Solo obtiene el texto

        if (estadoActual === "Inactivo") {
            actual.classList.add("bg-semaforo-rojo", "px-2", "py-1", "rounded-lg", "font-bold");
        } else if (estadoActual === "Suspendido") {
            actual.classList.add("bg-semaforo-amarillo", "px-2", "py-1", "rounded-lg", "font-bold");
        } else if (estadoActual === "Activo") {
            actual.classList.add("bg-semaforo-verde", "px-2", "py-1", "rounded-lg", "font-bold");
        }
    });
}

function buscarProducto() {
    let input = document.getElementById("buscador").value.toLowerCase().trim();
    let filas = document.querySelectorAll("#tabla tbody tr");
    let mensajeNoResultados = document.getElementById("mensaje-no-resultados");
    let hayCoincidencias = false;

    filas.forEach(fila => {
        let textoFila = fila.textContent.toLowerCase();

        if (textoFila.includes(input)) {
            fila.classList.remove("fade-out");
            fila.classList.add("fade-in");
            setTimeout(() => {
                fila.style.display = "";
            }, 200);
            hayCoincidencias = true;
        } else {
            fila.classList.remove("fade-in");
            fila.classList.add("fade-out");
            setTimeout(() => {
                fila.style.display = "none";
            }, 200);
        }
    });

    // Mostrar mensaje si no hay coincidencias
    if (hayCoincidencias) {
        mensajeNoResultados.classList.add("hidden");
    } else {
        mensajeNoResultados.classList.remove("hidden");
    }
};



document.addEventListener("DOMContentLoaded", () => {
    stock();
    estado();
});