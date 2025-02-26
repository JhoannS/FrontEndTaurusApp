document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".cardMenu");
    const mensajeNoResultados = document.getElementById("mensaje-no-resultados");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        let matches = 0;

        productCards.forEach(card => {
            const productName = card.querySelector("h5").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                card.style.display = "block"; // Muestra el producto
                matches++;
            } else {
                card.style.display = "none"; // Oculta el producto
            }
        });

        // Mostrar mensaje si no hay coincidencias
        if (matches === 0) {
            mensajeNoResultados.classList.remove("hidden");
            mensajeNoResultados.classList.add("fadeIn");
        } else {
            mensajeNoResultados.classList.add("hidden");
            mensajeNoResultados.classList.remove("fadeIn");
        }
    });
});
