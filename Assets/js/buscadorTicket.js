document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tickets = document.querySelectorAll(".ticket > div"); // Selecciona cada tarjeta individual
    const mensajeNoResultados = document.getElementById("mensaje-no-resultados");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        let matches = 0;

        tickets.forEach(ticket => {
            const textContent = ticket.textContent.toLowerCase(); // Captura todo el texto del ticket

            if (textContent.includes(searchText)) {
                ticket.classList.remove("hidden"); // Muestra el ticket
                matches++;
            } else {
                ticket.classList.add("hidden"); // Oculta el ticket
            }
        });

        // Mostrar mensaje si no hay coincidencias
        if (matches === 0) {
            mensajeNoResultados.classList.remove("hidden");
            mensajeNoResultados.classList.add("fade-in");
        } else {
            mensajeNoResultados.classList.add("hidden");
            mensajeNoResultados.classList.remove("fade-in");
        }
    });
});
