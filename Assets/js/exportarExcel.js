document.getElementById("exportarExcel").addEventListener("click", function () {
    exportarTablaAExcel("tabla", "Movimientos_Almacenados");
});

function exportarTablaAExcel(idTabla, nombreArchivo) {
    let tabla = document.getElementById(idTabla);
    let ws = XLSX.utils.table_to_sheet(tabla);

    // Crear un libro de trabajo
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Informacion de mi tabla");

    // Guardar el archivo
    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
}
