let idsGenerados = new Set();

function generarIDUnico() {
    let id;
    do {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    } while (idsGenerados.has(id));
    idsGenerados.add(id);
    return id;
}

function generarEtiqueta(event) {
    event.preventDefault();  // Evita que el formulario se envíe automáticamente

    const nombre = document.getElementById("nombre").value.trim();
    const uso = document.getElementById("uso").value.trim();
    if (!nombre || !uso) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const idUnico = generarIDUnico();
    guardarEtiqueta(nombre, uso, idUnico);  // Enviar a la base de datos

    const contenedor = document.createElement("div");
    contenedor.className = "w-[20%] border border-secundary-light p-2 rounded-lg";
    contenedor.innerHTML = `
                <svg id="barcode-${idUnico}" class="w-full rounded-lg h-[100px]"></svg>
                <div class="perfil w-10 h-10 rounded-full bg-essentials-primary shadow-essentials -mt-4 mx-2 z-50">
                    <img src="../Assets/img/Recursos Essentials/empleado.jpg" class="rounded-full" width="100%" alt="">
                </div>
                <div class="nombre-id flex justify-between items-center mt-3">
                    <p class="text-[25px]"> ${nombre}</p>
                    <p class="text-[20px]">${idUnico}</p>
                </div>
                <div class="fecha-us flex justify-between items-center mt-3">
                    <div class="fecha">
                        <p class="text-[14px] text-secundary-light">Fecha de creación:</p>
                        <p class="text-[14px] text-secundary-light">28 Feb de 2024, 16:27</p>
                    </div>
                    <div class="uso">
                        <p class="text-[14px] text-secundary-light">Uso:</p>
                        <p class="text-[14px] text-secundary-light">${uso}</p>
                    </div>
                </div>
                <div class="btn-accion flex justify-between items-center mt-2">
                    <button  class="p-1 rounded-full border border-secundary-light flex items-center justify-center"><span class="material-symbols-rounded text-[20px]">delete</span></button>
                    <button class="p-1 rounded-full border border-secundary-light flex items-center justify-center"><span class="material-symbols-rounded text-[20px]">edit</span></button>
                </div>
    `;

    document.getElementById("etiquetas").appendChild(contenedor);
    setTimeout(() => {
        JsBarcode(`#barcode-${idUnico}`, idUnico, {
            format: "CODE128",
            displayValue: true,
            width: 5,  // Grosor de barras
            height: 100,  // Altura del código de barras
            margin: 2  // Elimina márgenes extra
        }).render();
    }, 100);
    
    
}

function guardarEtiqueta(nombre, uso, idUnico) {
    fetch("http://localhost:3000/guardar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, uso, codigo: idUnico })
    })
    .then(response => response.json())
    .then(data => console.log("Etiqueta guardada:", data))
    .catch(error => console.error("Error al guardar:", error));
}

// Escuchar el evento del formulario
document.getElementById("etiquetaForm").addEventListener("submit", generarEtiqueta);
