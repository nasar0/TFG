<?php

    // Se requiere la clase de conexión a la base de datos
    require_once("conexion.php");

    // Definición de la clase promociones
    class promociones {
        private $db; // Variable para la conexión a la base de datos
        private $id;
        private $nombre;
        private $descripcion;
        private $descuento;
        private $fechaInicio;
        private $fechaFin;

        public function __construct() {
            $this->db = new con();  
            $this->id = -1;
            $this->nombre = "";
            $this->descripcion = "";
            $this->descuento = 0.00;
            $this->fechaInicio = "";
            $this->fechaFin = "";
        }

        public function getAll() {
            $sent = "SELECT * FROM promociones";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_result($id, $nombre, $descripcion, $descuento, $fechaInicio, $fechaFin);
            $consulta->execute();
    
            $promociones = [];
            while ($consulta->fetch()) {
                $promocion = new stdClass();
                $promocion->id = $id;
                $promocion->nombre = $nombre;
                $promocion->descripcion = $descripcion;
                $promocion->descuento = $descuento;
                $promocion->fechaInicio = $fechaInicio;
                $promocion->fechaFin = $fechaFin;
                $promociones[] = $promocion;
            }

            $consulta->close();
            return $promociones;
        }

        public function actualizar($nombre, $descripcion, $descuento, $fechaInicio, $fechaFin, $id) {
            // Preparar la consulta SQL para actualizar la promoción
            $sent = "UPDATE promociones SET 
                    Nombre_Promocion = ?, 
                    Descripción = ?,
                    Descuento = ?,
                    Fecha_Inicio = ?,
                    Fecha_Fin = ?
                    WHERE ID_Promocion = ?";
        
            // Preparar la sentencia
            $consulta = $this->db->getCon()->prepare($sent);
        
            // Vincular los parámetros
            $consulta->bind_param("ssdssi", $nombre, $descripcion, $descuento, $fechaInicio, $fechaFin, $id);
        
            // Ejecutar la consulta
            if ($consulta->execute()) {
                return true; // Actualización exitosa
            } else {
                // Cerrar la sentencia
                $consulta->close();
                return false; 
            }
        }

        public function insertar($nombre, $descripcion, $descuento, $fechaInicio, $fechaFin) {
            try {
                $sent = "INSERT INTO promociones (Nombre_Promocion, Descripción, Descuento, Fecha_Inicio, Fecha_Fin) 
                        VALUES (?, ?, ?, ?, ?)";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("ssdss", $nombre, $descripcion, $descuento, $fechaInicio, $fechaFin);
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

        public function eliminar($id) {
            try {
                $sent = "DELETE FROM promociones WHERE ID_Promocion = ?";
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
        public function encontrarPromocion($nombre) {
            try {
                $sent = "SELECT * from promociones where Nombre_Promocion=?";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("s", $nombre);
                $consulta->execute();
                
                $result = $consulta->get_result();

                $promocion = [];
                while ($row = $result->fetch_object()) {
                    $promocion[] = $row;
                }

                $consulta->close();
                return $promocion;
            } catch (Exception $e) {
                return false;
            }
        }
    }

?>