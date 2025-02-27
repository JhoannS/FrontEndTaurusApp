const wrapper = document.querySelector(".zonaUp");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("img");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive() {
    defaultBtn.click();
}

defaultBtn.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const maxSize = 3 * 1024 * 1024; // 3MB en bytes
        if (file.size > maxSize) {
            alert("El archivo es demasiado grande. Máximo 3MB.");
            defaultBtn.value = "";
            return;
        }

        const validExtensions = ["image/jpeg", "image/png", "image/gif"];
        if (!validExtensions.includes(file.type)) {
            alert("Formato no permitido. Sube una imagen en JPG, PNG o GIF.");
            defaultBtn.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            img.src = reader.result;
            wrapper.classList.add("active", "fade-in");
        };
        reader.readAsDataURL(file);
    }

    if (this.value) {
        let valueStore = this.value.match(regExp);
        fileName.textContent = valueStore;
    }
});

cancelBtn.addEventListener("click", function () {
    img.src = "";
    wrapper.classList.remove("active", "fade-in");
    defaultBtn.value = "";
});

const capitalizeFirstLetter = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

const fields = [
    { input: 'plu', preview: 'pluPreview' },
    { input: 'nombreProducto', preview: 'nombreProductoPreview' },
    { input: 'descripcionProducto', preview: 'descripcionProductoPreview' },
    { input: 'categoriaProducto', preview: 'categoriaProductoPreview' },
    { input: 'subcategoriaProducto', preview: 'subcategoriaProductoPreview' },
    { input: 'stockProducto', preview: 'stockProductoPreview' },
    { input: 'cantidadProducto', preview: 'cantidadProductoPreview' },
    { input: 'marcaProducto', preview: 'marcaProductoPreview' },
    { input: 'descuentoProducto', preview: 'descuentoProductoPreview' },
    { input: 'precioNetoProducto', preview: 'precioNetoProductoPreview' },
    { input: 'ivaProducto', preview: 'ivaProductoPreview' },
    { input: 'loteProducto', preview: 'loteProductoPreview' },
    { input: 'rsaProducto', preview: 'rsaProductoPreview' },
    { input: 'vencimientoProducto', preview: 'vencimientoProductoPreview' },
    { input: 'proveedorProducto', preview: 'proveedorProductoPreview' }
];

function updatePreview() {
    fields.forEach(({ input, preview }) => {
        const inputElement = document.getElementById(input);
        const previewElement = document.getElementById(preview);

        if (inputElement && previewElement) {
            const value = inputElement.value.trim() || previewElement.dataset.defaultValue || '';
            previewElement.textContent = capitalizeFirstLetter(value);
        }
    });

    const unidadSelect = document.getElementById('unidadMedidaProducto');
    const unidadPreview = document.getElementById('unidadMedidaProductoPreview');

    if (unidadSelect && unidadPreview) {
        const selectedOption = unidadSelect.options[unidadSelect.selectedIndex]?.text || unidadPreview.dataset.defaultValue || '';
        unidadPreview.textContent = capitalizeFirstLetter(selectedOption);
    }
}

// Función para obtener valores numéricos formateados correctamente
function obtenerNumero(element) {
    if (!element || !element.value) return 0;
    let valor = element.value.replace(/\./g, '').replace(',', '.'); // Eliminar puntos y convertir coma a decimal
    return parseFloat(valor) || 0;
}

function calcularPrecioFinal() {
    let precioNeto = obtenerNumero(document.getElementById('precioNetoProducto'));
    let descuento = obtenerNumero(document.getElementById('descuentoProducto'));
    let iva = obtenerNumero(document.getElementById('ivaProducto'));

    let precioConDescuento = precioNeto - descuento;
    let precioFinal = precioConDescuento + (precioConDescuento * (iva / 100));

    let precioFinalPreview = document.getElementById('precioFinalPreview');
    if (precioFinalPreview) {
        precioFinalPreview.textContent = precioFinal.toLocaleString('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fields.forEach(({ input }) => {
        const element = document.getElementById(input);
        if (element) {
            element.addEventListener('input', updatePreview);
            const previewElement = document.getElementById(`${input}Preview`);
            if (previewElement) {
                previewElement.dataset.defaultValue = previewElement.textContent.trim();
            }
        }
    });

    const unidadSelect = document.getElementById('unidadMedidaProducto');
    if (unidadSelect) {
        unidadSelect.addEventListener('change', updatePreview);
        const previewElement = document.getElementById('unidadMedidaProductoPreview');
        if (previewElement) {
            previewElement.dataset.defaultValue = previewElement.textContent.trim();
        }
    }

    ['precioNetoProducto', 'descuentoProducto', 'ivaProducto'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                formatearNumeroInput({ target: input });
                calcularPrecioFinal();
            });
        }
    });

    calcularPrecioFinal();
});

function formatearNumeroInput(event) {
    let input = event.target;
    let value = input.value.replace(/\./g, '');

    let numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
        input.value = '';
        return;
    }

    input.value = numberValue.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    calcularPrecioFinal();
}

document.querySelectorAll('#precioNetoProducto, #descuentoProducto, #ivaProducto').forEach(input => {
    input.addEventListener('input', event => {
        formatearNumeroInput(event);
        calcularPrecioFinal();
    });
});
