<?php
require_once("conexion.php");

class productos {
    private $db;
    private $id;
    private $nombre;
    private $descripcion;
    private $precio;
    private $stock;
    private $tamano;
    private $color;
    private $img_url;
    private $genero;
    private $categoria;

    // Constructor
    public function __construct() {
        $this->db = new con();
        $this->id = 0;
        $this->nombre = "";
        $this->descripcion = "";
        $this->precio = 0;
        $this->stock = 0;
        $this->tamano = "";
        $this->color = "";
        $this->img_url = "";
        $this->genero = "";
        $this->categoria = 0;
    }

    // Método para obtener todos los productos
    public function getAll() {
        $sent = "SELECT * FROM productos";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();

        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }

        $consulta->close();
        return $productos;
    }

    // Método para insertar un producto
    public function insertar($nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria) {
        try {
            $sent = "INSERT INTO productos (Nombre_Producto, Descripcion, Precio, Stock, Tamano, Color, Img_URL, Genero, categoria) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ssdiisssi", $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
            if ($consulta->execute()) {
                return true;
            } else {
                throw new Exception("Error al ejecutar la consulta: " . $consulta->error);
            }
        } catch (Exception $e) {
            error_log("Error en insertar: " . $e->getMessage());
            return false;
        }
    }

    // Método para eliminar un producto
    public function eliminar($id) {
        try {
            $sent = "DELETE FROM productos WHERE ID_Productos = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("i", $id);
            if ($consulta->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            error_log("Error en eliminar: " . $e->getMessage());
            return false;
        }
    }
     // Método para actualizar un producto
     public function actualizar($nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria,$ID_Productos) {
            $sent = "UPDATE productos SET 
            Nombre_Producto = ?, 
            Descripcion = ?, 
            Precio = ?, 
            stock = ?, 
            Tamano = ?, 
            Color = ?, 
            img_url=?,
            Genero = ? ,
            categoria = ?
            WHERE ID_Productos = ?";
            // Preparar la sentencia
            $consulta = $this->db->getCon()->prepare($sent);
        
            // Vincular los parámetros
            $consulta->bind_param("ssiissssii", $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria,$ID_Productos);
        
            // Ejecutar la consulta
            if ($consulta->execute()) {
                return true; // Actualización exitosa
            } else {
                // Cerrar la sentencia
                $consulta->close();
                return false; 
            }
    
    }
    // Método para actualizar las imágenes de un producto
    public function actualizarImagenes($id, $imagenes) {
        try {
            $sent = "UPDATE productos SET Img_URL = ? WHERE ID_Productos = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("si", $imagenes, $id);
            if ($consulta->execute()) {
                return true;
            } else {
                throw new Exception("Error al ejecutar la consulta: " . $consulta->error);
            }
        } catch (Exception $e) {
            error_log("Error en actualizarImagenes: " . $e->getMessage());
            return false;
        }
    }
}
?>