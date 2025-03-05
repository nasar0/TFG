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
        $this->categoria= 0;
    }
    public function __get($nom)
    {
        return $this->$nom; // Getter para obtener propiedades privadas
    }
    

    // Método para obtener todos los productos
    public function getAll() {
        $sent = "SELECT * FROM productos";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero,$categoria);
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
            $producto->categoria= $categoria;
            $productos[] = $producto;
        }

        $consulta->close();
        return $productos;
    }
    // Métodos para insertar, actualizar, eliminar productos
    public function insertar($n,$d,$p,$s,$t,$c,$i,$g,$cc) {
        try {
            $sent="INSERT INTO productos (Nombre_Producto, Descripción, Precio, Stock,Tamaño,Color,Img_URL,Genero,categoria) VALUES (?, ?, ?, ?, ?,?, ?, ?)";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ssiisssi",$n,$d,$p,$s,$t,$c,$i,$g,$cc);
            $consulta->execute();
        } catch (Exception $e) {
            
        }
    }
    public function actualizar() {
    
    }
    public function eliminar() {
        try {
            // Iniciar la transacción
            $this->db->getCon()->begin_transaction();
            
            // Eliminar de 'productos'
            $sent = "DELETE FROM productos WHERE ID_Productos = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $consulta->close();
    
            // Confirmar la transacción
            $this->db->getCon()->commit();
            return true;
        } catch (Exception $e) {
            // Si algo falla, hacer rollback para evitar inconsistencias
            $this->db->getCon()->rollback();
            return false;
        }
    }



    


}

?>