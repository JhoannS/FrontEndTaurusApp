// Selecciona todos los elementos del DOM necesarios
const modals = document.querySelectorAll('.modal'); // Todos los modales
const modalButtons = document.querySelectorAll('[data-modal-target]'); // Botones para abrir modales
const closeButtons = document.querySelectorAll('[data-modal-close]'); // Botones para cerrar modales

// Función para abrir un modal específico
function openModal(modal) {
  // Cierra todos los modales activos
  modals.forEach((m) => m.classList.add('hidden'));
  // Abre el modal deseado
  modal.classList.remove('hidden');
}

// Función para cerrar un modal específico
function closeModal(modal) {
  modal.classList.add('hidden');
}

// Asignar eventos a los botones de abrir modales
modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-modal-target'); // Obtiene el ID del modal a abrir
    const targetModal = document.getElementById(targetId);
    if (targetModal) {
      openModal(targetModal);
    }
  });
});

// Asignar eventos a los botones de cerrar modales
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetModal = button.closest('.modal'); // Encuentra el modal asociado al botón
    if (targetModal) {
      closeModal(targetModal);
    }
  });
});

// Cerrar modal al hacer clic fuera del contenido
modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});