// Genera el ID único para la orden
document.addEventListener("DOMContentLoaded", function () {
    function generarIDUnico() {
        return Math.floor(1000000000 + Math.random() * 9000000000); // Número de 10 dígitos
    }
    document.getElementById("numeroAleatorio").textContent = generarIDUnico();
});

document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".btn-essentials");
    const tbody = document.querySelector(".facturador table tbody");
    const totalDisplay = document.querySelector("#total");
    const bottom = document.querySelector(".facturador .bottom");
    let totalFinal = 0;
    let hasInteracted = false; // Se activa cuando se agrega al menos un producto

    // Bloque inferior oculto por defecto
    bottom.style.display = "none";

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function () {
            hasInteracted = true;
            const card = this.closest(".cardMenu");
            const nombre = card.querySelector("h5").innerText;
            const precioTexto = card.querySelector(".precio-btn p").innerText;
            const precio = parseInt(precioTexto.replace(/\D/g, ""));
            const imagen = card.querySelector("img").src;
            agregarAlFacturador(nombre, precio, imagen);
        });
    });

    function agregarAlFacturador(nombre, precio, imagen) {
        // Si existe el mensaje "No hay productos a calcular", lo removemos
        const mensajeRow = document.getElementById("mensaje-sin-productos");
        if (mensajeRow) mensajeRow.remove();

        let filaExistente = document.querySelector(`.fila-producto[data-nombre="${nombre}"]`);
        if (filaExistente) {
            // Si ya existe, incrementa la cantidad
            let cantidadElem = filaExistente.querySelector(".cantidad");
            let totalCell = filaExistente.querySelector(".total");
            let cantidad = parseInt(cantidadElem.value) + 1;
            cantidadElem.value = cantidad;
            totalCell.innerText = `$${(cantidad * precio).toLocaleString()}`;
        } else {
            // Crea la fila nueva con animación fadeIn
            const fila = document.createElement("tr");
            fila.classList.add("fila-producto", "border-t-[2px]", "animate-fadeIn");
            fila.setAttribute("data-nombre", nombre);
            fila.innerHTML = `
                <td class="text-left text-[16px] p-2 w-[50%]">
                    <div class="flex items-center gap-[5px]">
                        <div class="flex flex-col">
                            <p>${nombre}</p>
                            <p class="text-[14px] -mt-[3px]">$${precio.toLocaleString()}</p>
                        </div>
                    </div>
                </td>
                <td class="text-center text-[12px] p-2 w-[30%]">
                    <div class="input w-[100%]">
                        <input type="number" class="cantidad" value="1" min="1">
                        <span class="material-symbols-rounded text-essentials-primary">pin</span>
                    </div>
                </td>
                <td class="text-center text-[16px] p-2 total">$${precio.toLocaleString()}</td>
                <td class="text-center p-2">
                    <span class="material-symbols-rounded cursor-pointer hover:text-mono-blanco hover:bg-essentials-primary text-essentials-primary border-[2px] border-essentials-primary rounded-md p-1 eliminar">delete</span>
                </td>
            `;
            tbody.appendChild(fila);

            // Al finalizar la animación, remueve la clase
            fila.addEventListener("animationend", function () {
                fila.classList.remove("animate-fadeIn");
            });

            // Elimina el producto con animación fadeOut
            fila.querySelector(".eliminar").addEventListener("click", function () {
                eliminarProducto(fila);
            });

            // Actualiza el total al modificar la cantidad
            fila.querySelector(".cantidad").addEventListener("input", function () {
                actualizarCantidad(fila, precio);
            });
        }
        actualizarTotal();
    }

    function eliminarProducto(fila) {
        fila.classList.add("animate-fadeOut");
        fila.addEventListener("animationend", function () {
            fila.remove();
            actualizarTotal();
        });
    }

    function actualizarCantidad(fila, precio) {
        let cantidad = parseInt(fila.querySelector(".cantidad").value);
        let totalCell = fila.querySelector(".total");
        totalCell.innerText = `$${(cantidad * precio).toLocaleString()}`;
        actualizarTotal();
    }

    function actualizarTotal() {
        totalFinal = 0;
        const filas = document.querySelectorAll(".fila-producto");
        filas.forEach(fila => {
            let rowTotal = parseInt(fila.querySelector(".total").innerText.replace(/\D/g, ""));
            totalFinal += rowTotal;
        });
        totalDisplay.innerText = `$${totalFinal.toLocaleString()}`;

        if (totalFinal > 0) {
            bottom.style.display = ""; // Muestra el bloque inferior
            if (tbody.querySelector("#mensaje-sin-productos")) {
                tbody.innerHTML = "";
            }
        } else {
            bottom.style.display = "none"; // Oculta el bloque inferior
            if (hasInteracted) {
                // Inserta el mensaje si hubo interacción
                tbody.innerHTML = `<tr id="mensaje-sin-productos"><td colspan="4" class="text-center py-4 text-secundary-light text-[18px]">No hay productos a calcular</td></tr>`;
            }
        }
    }
});
