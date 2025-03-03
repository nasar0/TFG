<?php
    require_once("conexion.php");

class producto {
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
    }
    public function __get($nom)
    {
        return $this->$nom; // Getter para obtener propiedades privadas
    }
    

    // Método para obtener todos los productos
    public function getAll() {
        $sent = "SELECT * FROM productos";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero);
        $consulta->execute();

        $productos = [];
        while ($consulta->fetch()) {
            $producto = new producto();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $productos[] = $producto;
        }

        $consulta->close();
        return $productos;
    }
    // Métodos para insertar, actualizar, eliminar productos
    public function insertar($n,$d,$p,$s,$t,$c,$i,$g) {
        try {
            $sent="INSERT INTO productos (Nombre_Producto, Descripción, Precio, Stock,Tamaño,Color,Img_URL,Genero) VALUES (?, ?, ?, ?, ?,?, ?, ?)";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ssiisss",$n,$d,$p,$s,$t,$c,$i,$g);
            $consulta->execute();
        } catch (Exception $e) {
            
        }
    }
    public function actualizar() {
    
    }
    public function eliminar() {
    
    }



    


}

?>