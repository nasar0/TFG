<?php

    // Se requiere la clase de conexión a la base de datos
    require_once("conexion.php");

    // Definición de la clase categoria
    class categorias {
        private $db; // Variable para la conexión a la base de datos
        private $id ;
        private $nombre;
        private $descripcion;

        public function __construct() {
            $this->db = new con();  
            $this->id  = -1;
            $this->nombre = "";
            $this->descripcion = "";
        }
        public function getAll() {
            $sent = "SELECT * FROM categoria";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_result($id, $nombre, $descripcion);
            $consulta->execute();
    
            $categorias = [];
            while ($consulta->fetch()) {
                $categoria = new stdClass();
                $categoria->id = $id;
                $categoria->nombre = $nombre;
                $categoria->descripcion = $descripcion;
                $categorias[] = $categoria;
            }

            $consulta->close();
            return $categorias;
        }
        public function actualizar($nombre, $descripcion, $id ) {
            // Preparar la consulta SQL para actualizar el usuario
            $sent = "UPDATE categoria SET 
                    Nombre_Categoría = ?, 
                    Descripcion = ?
                    WHERE ID_Categoría = ?";
        
            // Preparar la sentencia
            $consulta = $this->db->getCon()->prepare($sent);
        
            // Vincular los parámetros
            $consulta->bind_param("ssi", $nombre, $descripcion, $id );
        
            // Ejecutar la consulta
            if ($consulta->execute()) {
                return true; // Actualización exitosa
            } else {
                // Cerrar la sentencia
                $consulta->close();
                return false; 
            }
        
            
        }
        public function insertar($nombre, $descripcion) {
            try {
                $sent = "INSERT INTO categoria (Nombre_Categoría, Descripcion) 
                        VALUES (?, ?)";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("ss", $nombre, $descripcion);
                if ($consulta->execute()) {
                    return true;
                } else {
                    throw new Exception("Error al ejecutar la consulta: " . $consulta->error);
                }
            } catch (Exception $e) {
                return false;
            }
        }

        public function eliminar($id) {
            try {
                $sent = "DELETE FROM categoria WHERE  ID_Categoría  = ?";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("i", $id);
                if ($consulta->execute()) {
                    return true;
                } else {
                    return false;
                }
            } catch (Exception $e) {
                return false;
            }
        
         }

}






?>