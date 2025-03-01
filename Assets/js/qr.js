let idsGenerados = new Set();

        function generarIDUnico() {
            let id;
            do {
                id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
            } while (idsGenerados.has(id));
            idsGenerados.add(id);
            return id;
        }

        function generarQR(event) {
            event.preventDefault();

            const titulo = document.getElementById("titulo").value.trim();
            const enlace = document.getElementById("enlace").value.trim();
            if (!titulo || !enlace) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const idUnico = generarIDUnico();
            guardarQR(titulo, enlace, idUnico);

            const contenedor = document.createElement("div");
            contenedor.className = "p-4 rounded-lg shadow-lg w-[25%]";
            contenedor.innerHTML = `
               <div id="qrcode-${idUnico}" class="w-[100%]"></div>
                <div class="titulo-id flex justify-between items-center">
                    <h3 class="text-lg font-semibold mb-2">${titulo}</h3>
                    <p class="text-xs text-gray-400 mt-2">ID: ${idUnico}</p>
                </div>

                <a href="${enlace}" target="_blank" class="">
                    <button class="btn-essentials shadow-essentials">Ir al enlace</button>
                </a>
            `;

            document.getElementById("contenedorQR").appendChild(contenedor);

            new QRCode(document.getElementById(`qrcode-${idUnico}`), enlace);
        }

        function guardarQR(titulo, enlace, idUnico) {
            fetch("http://localhost:3000/guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, enlace, codigo: idUnico })
            })
            .then(response => response.json())
            .then(data => console.log("QR guardado:", data))
            .catch(error => console.error("Error al guardar:", error));
        }

        document.getElementById("qrForm").addEventListener("submit", generarQR);