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


// Función para capitalizar la primera letra
const capitalizeFirstLetter = str =>
  str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

// Configuración dinámica para actualizar la vista previa
function updatePreview() {
  // Lista de campos de texto y select para actualizar dinámicamente
  const fields = [
      { input: 'plu', preview: 'pluPreview' },
      { input: 'nombreProducto', preview: 'nombreProductoPreview' },
      { input: 'descripcionProducto', preview: 'descripcionProductoPreview' },
      { input: 'categoriaProducto', preview: 'categoriaProductoPreview' },
      { input: 'subcategoriaProducto', preview: 'subcategoriaProductoPreview' },
      { input: 'stockProducto', preview: 'stockProductoPreview' },
      { input: 'cantidadProducto', preview: 'cantidadProductoPreview' },
      { input: 'unidadMedidaProducto', preview: 'unidadMedidaProductoPreview'},
      { input: 'marcaProducto', preview: 'marcaProductoPreview'},
      { input: 'descuentoProducto', preview: 'descuentoProductoPreview'},
      { input: 'precioNetoProducto', preview: 'precioNetoProductoPreview' },
      { input: 'ivaProducto', preview: 'ivaProductoPreview' },
      { input: 'loteProducto', preview: 'loteProductoPreview' },
      { input: 'rsaProducto', preview: 'rsaProductoPreview' },
      { input: 'vencimientoProducto', preview: 'vencimientoProductoPreview' },
      { input: 'proveedorProducto', preview: 'proveedorProductoPreview' }
  ];

  // Actualizar dinámicamente los valores en la vista previa
  fields.forEach(({ input, preview }) => {
      const value = document.getElementById(input)?.value || '';
      document.getElementById(preview).textContent = capitalizeFirstLetter(value);
  });

  // Actualizar la unidad de medida seleccionada
  const selectedUnidad = document.querySelector('input[name="unidadMedidaProducto"]:checked')?.value || '';
  document.getElementById('unidadMedidaProductoPreview').textContent = capitalizeFirstLetter(selectedUnidad);
}

// Asignar listeners de manera dinámica
[
  'plu', 
  'nombreProducto',
  'categoriaProducto', 
  'subcategoriaProducto',
  'descripcionProducto', 
  'stockProducto',
  'cantidadProducto', 
  'unidadMedidaProducto',
  'marcaProducto', 
  'descuentoProducto', 
  'precioNetoProducto', 
  'ivaProducto', 
  'loteProducto',
  'rsaProductoProducto',
  'vencimientoProducto', 
  'proveedorProducto',
].forEach(id => {
  document.getElementById(id)?.addEventListener('input', updatePreview);
});

