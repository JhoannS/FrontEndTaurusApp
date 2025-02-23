// Datos de las barras de progreso con tags para cada segmento
let barsData = [
  {
    id: "bar1",
    title: "Sucursales activas:",
    segments: [
      { max: 1, value: 1, color: "bg-blue-500", tag: "Sucursal 1: 'Direccion sucursal'" },
      { max: 1, value: 1, color: "bg-green-500", tag: "Sucursal 2: 'Direccion sucursal'" }
    ],
  },
  {
    id: "bar2",
    title: "Gestión usuarios:",
    segments: [
      { max: 9999, value: 1, color: "bg-purple-500", tag: "Empleados" },
      { max: 9999, value: 1, color: "bg-yellow-500", tag: "Usuarios" },
      { max: 9999, value: 1, color: "bg-orange-500", tag: "Clientes" },
    ],
  },
  {
    id: "bar3",
    title: "Facturación POS",
    segments: [
      { max: 9999, value: 1, color: "bg-teal-500", tag: "Farmacia" },
      { max: 9999, value: 1, color: "bg-pink-500", tag: "Dermatología" }
    ],
  },
  {
    id: "bar4",
    title: "Gestión de inventarios",
    segments: [
      { max: 9999, value: 1, color: "bg-cyan-500", tag: "Categorías" },
      { max: 9999, value: 1, color: "bg-indigo-500", tag: "Productos" },
      { max: 9999, value: 1, color: "bg-lime-500", tag: "Servicios" },
    ],
  },
  {
    id: "bar5",
    title: "Gestión de mesas:",
    segments: [
      { max: 200, value: 1, color: "bg-emerald-500", tag: "Analgésicos" },
    ],
  },
];

// Función para renderizar las barras de progreso
function renderProgressBars() {
  const container = document.getElementById("progressBarsContainer");
  container.innerHTML = "";

  barsData.forEach((bar) => {
    let totalValue = bar.segments.reduce((sum, segment) => sum + segment.value, 0);

    // Contenedor de cada barra
    let barContainer = document.createElement("div");
    barContainer.classList.add("space-y-2");

    // Título de la barra
    let title = document.createElement("div");
    title.classList.add("titulo", "flex", "justify-between", "text-[13px]");
    title.innerHTML = `<p>${bar.title}:</p><p>${totalValue}</p>`;

    // Contenedor de la barra de progreso
    let progressBar = document.createElement("div");
    progressBar.classList.add(
      "w-full",
      "bg-gray-300",
      "rounded-full",
      "h-2",
      "flex",
      "overflow-hidden",
      "relative"
    );

    let totalMax = Math.max(...bar.segments.map((s) => s.max));
    bar.segments.forEach((segment) => {
      let percentage = (segment.value / totalMax) * 100;

      let segmentDiv = document.createElement("div");
      segmentDiv.classList.add(segment.color, "h-2", "transition-all", "duration-500");
      segmentDiv.style.width = percentage + "%";

      progressBar.appendChild(segmentDiv);
    });

    // Contenedor de los tags con colores
    let tagsContainer = document.createElement("div");
    tagsContainer.classList.add("flex", "flex-wrap", "gap-3", "mt-2");

    bar.segments.forEach((segment) => {
      let tagElement = document.createElement("div");
      tagElement.classList.add("flex", "items-center", "gap-1", "text-[12px]");

      let colorBox = document.createElement("div");
      colorBox.classList.add("h-[12px]", "w-[12px]", "rounded-sm", segment.color);

      let tagText = document.createElement("p");
      tagText.innerHTML = `${segment.tag}: <span>${segment.value}/${segment.max}</span>`;

      tagElement.appendChild(colorBox);
      tagElement.appendChild(tagText);
      tagsContainer.appendChild(tagElement);
    });

    barContainer.appendChild(title);
    barContainer.appendChild(progressBar);
    barContainer.appendChild(tagsContainer);
    container.appendChild(barContainer);
  });
}

// Inicializar barras al cargar la página
document.addEventListener("DOMContentLoaded", renderProgressBars);
