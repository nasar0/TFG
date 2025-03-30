<?php

    // Se requiere la clase de conexión a la base de datos
    require_once("conexion.php");

    // Definición de la clase usuarios
    class usuarios {
        private $db; // Variable para la conexión a la base de datos
        private $id_usuario;
        private $nombre;
        private $correo;
        private $contrasena;
        private $direccion;
        private $telefono;
        private $rol;

        public function __construct() {
            $this->db = new con();  
            $this->id_usuario = -1;
            $this->nombre = "";
            $this->correo = "";
            $this->contrasena = "";
            $this->direccion = "";
            $this->telefono = "";
            $this->rol = -1;
        }
        public function iniciar_sesion($ema, $cont) {
            $sent = "SELECT rol FROM usuarios WHERE Correo = ? and Contrasenna = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ss", $ema,$cont);
            $consulta->execute();
            $consulta->bind_result($rol);
            
            if ($consulta->fetch()) {
                $consulta->close();
                return $rol; 
                
            }
            $consulta->close();
            return false; 
        }
        public function estadisticas(){
            $sent="SELECT (SELECT COUNT(*) FROM usuarios) AS TotalUsuarios, (SELECT COUNT(*) FROM productos) AS TotalProductos,(SELECT COUNT(*) FROM categoria) AS TotalCategorias,(SELECT SUM(Monto) FROM pagos) AS TotalPagos FROM dual;";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->execute();
            $consulta->bind_result($usu, $prod, $cat, $vent);
            $estasts = [];
            
            if ($consulta->fetch()) { 
                $estast = new stdClass();
                $estast->Usuarios = $usu;
                $estast->Productos = $prod;
                $estast->Categorias = $cat;
                $estast->Ventas = $vent;
                $estasts[] = $estast;
            }

            $consulta->close();  
            return $estasts;
        }
        public function listarUsuarios(){
            $sent="SELECT * FROM usuarios";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->execute();
            $consulta->bind_result($id, $nom, $cor, $pas,$dir, $tel, $rol);

            $usuarios = [];
            
            while ($consulta->fetch()) { 
                $usuario = new stdClass();
                $usuario->id_usuario = $id;
                $usuario->nombre = $nom;
                $usuario->correo = $cor;
                $usuario->contrasena = $pas;
                $usuario->direccion = $dir;
                $usuario->telefono = $tel;
                $usuario->rol = $rol;
                $usuarios[] = $usuario;
                
            }

            $consulta->close();  
            return $usuarios;
        }
        public function listarUsuariosByEmail($correo){
            $sent = "SELECT u.ID_Usuario,u.Nombre,u.Correo,u.Dirección,u.Teléfono FROM usuarios u WHERE Correo=?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("s", $correo); 
            $consulta->execute();
            $consulta->bind_result($id, $nom, $cor,$dir, $tel);

            $usuario = new stdClass();
            if ($consulta->fetch()) { 
                
                $usuario->id_usuario = $id;
                $usuario->nombre = $nom;
                $usuario->correo = $cor;
                $usuario->direccion = $dir;
                $usuario->telefono = $tel;
            }

            $consulta->close();  
            return $usuario;
        }
        public function ActualizarUsuarios($nombre, $correo, $direccion, $telefono, $rol, $id_usuario) {
            // Preparar la consulta SQL para actualizar el usuario
            $sent = "UPDATE usuarios SET 
                    Nombre = ?, 
                    Correo = ?, 
                    Dirección = ?, 
                    Teléfono = ?, 
                    Rol = ? 
                    WHERE ID_Usuario = ?";
        
            // Preparar la sentencia
            $consulta = $this->db->getCon()->prepare($sent);
        
            // Vincular los parámetros
            $consulta->bind_param("ssssii", $nombre, $correo, $direccion, $telefono, $rol, $id_usuario);
        
            // Ejecutar la consulta
            if ($consulta->execute()) {
                return true; // Actualización exitosa
            } else {
                // Cerrar la sentencia
                $consulta->close();
                return false; 
            }
        
            
        }
        public function EliminarUsuarios($id) {
            try {
                // Iniciar la transacción
                $this->db->getCon()->begin_transaction();
                //Eliminar usuario pero mantener todos los pagos 
                $sent = "UPDATE pagos SET ID_Usuario = NULL WHERE ID_Usuario = ?";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("i", $id);
                $consulta->execute();
                $consulta->close();

                // Eliminar de 'añade' según el carrito del usuario
                $sent = "DELETE FROM añade WHERE ID_Carrito IN (SELECT ID_Carrito FROM carrito WHERE ID_Usuario = ?)";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("i", $id);
                $consulta->execute();
                $consulta->close();
        
                // Eliminar de 'carrito' según el usuario
                $sent = "DELETE FROM carrito WHERE ID_Usuario = ?";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("i", $id);
                $consulta->execute();
                $consulta->close();
                
                // Eliminar de 'usuarios'
                $sent = "DELETE FROM usuarios WHERE ID_Usuario = ?";
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