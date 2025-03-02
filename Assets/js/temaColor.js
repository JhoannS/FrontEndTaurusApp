document.addEventListener('DOMContentLoaded', () => {
    // Verifica si hay un tema guardado en localStorage
    const temaGuardado = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', temaGuardado);
});

// Función para alternar el tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
