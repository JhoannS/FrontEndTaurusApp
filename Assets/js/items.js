function actualizarColores() {
    let cantidades = document.querySelectorAll(".cantidad");

    cantidades.forEach(elemento => {
        let valor = parseInt(elemento.textContent);

        if (valor <= 9) {
            elemento.classList.add("bg-semaforo-rojo", "text-mono-blanco");
        } else if (valor >= 10 && valor <= 14) {
            elemento.classList.add("bg-semaforo-amarillo", "text-mono-blanco");
        } else if (valor >= 15) {
            elemento.classList.add("bg-semaforo-verde", "text-mono-blanco");
        }
    });
}

actualizarColores(); // Llamar la función al cargar la página