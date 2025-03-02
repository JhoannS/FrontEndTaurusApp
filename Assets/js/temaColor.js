document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    // Cargar el tema guardado
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Función para alternar tema
    function toggleTheme() {
        body.classList.toggle("dark-mode");
        
        // Guardar la preferencia en localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    }

    // Asignar evento al botón de cambio de tema
    themeToggle.addEventListener("click", toggleTheme);
});
