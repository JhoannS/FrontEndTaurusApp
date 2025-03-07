CREATE TABLE productos_essentials(
	
    id_estado INT DEFAULT 1,
    id_producto_universal INT,
    id_receta_producto INT,

    unidad_medida_producto VARCHAR(100) NOT NULL,
    cantidad_producto VARCHAR(100) NOT NULL,
    marca_producto VARCHAR(100) NOT NULL,
    precio_neto_producto DECIMAL(10,2) NOT NULL,
    iva_producto VARCHAR(5) NOT NULL,
    descuento_producto DECIMAL(10,2) NOT NULL,
    proveedor_producto VARCHAR(100) NOT NULL,
    lote_producto VARCHAR(50) NOT NULL,
    registro_sanitario_producto VARCHAR(150) NOT NULL,
    fecha_vencimiento DATE DEFAULT "2999-12-31",
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
    FOREIGN KEY (id_estado) REFERENCES estados(id),
    FOREIGN KEY (id_producto_universal) REFERENCES productos_universales(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    FOREIGN KEY (id_receta_producto) REFERENCES recetas_productos(id)
);
create table user (
    id int auto increment