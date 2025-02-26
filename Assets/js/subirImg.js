const wrapper = document.querySelector(".zonaUp");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("img");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive(){
  defaultBtn.click();
}

defaultBtn.addEventListener("change", function(){
  const file = this.files[0];

  if (file) {
    // Validar tamaño máximo (3MB)
    const maxSize = 3 * 1024 * 1024; // 3MB en bytes
    if (file.size > maxSize) {
      alert("El archivo es demasiado grande. Máximo 3MB.");
      defaultBtn.value = ""; // Reiniciar input
      return;
    }

    // Validar tipo de archivo
    const validExtensions = ["image/jpeg", "image/png", "image/gif"];
    if (!validExtensions.includes(file.type)) {
      alert("Formato no permitido. Sube una imagen en JPG, PNG o GIF.");
      defaultBtn.value = ""; // Reiniciar input
      return;
    }

    // Mostrar la imagen si pasa las validaciones
    const reader = new FileReader();
    reader.onload = function() {
      const result = reader.result;
      img.src = result;
      wrapper.classList.add("active", "fade-in");
    };

    reader.readAsDataURL(file);
  }

  // Mostrar el nombre del archivo
  if (this.value) {
    let valueStore = this.value.match(regExp);
    fileName.textContent = valueStore;
  }
});

// Función para cancelar la selección
cancelBtn.addEventListener("click", function(){
  img.src = "";
  wrapper.classList.remove("active", "fade-in");
  defaultBtn.value = ""; // Reiniciar input
});
