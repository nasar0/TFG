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
            $sent="SELECT COUNT(usuarios.ID_Usuario), COUNT(DISTINCT productos.ID_Productos),COUNT(DISTINCT categoria.ID_Categoría),SUM( pagos.Monto) FROM usuarios, productos,categoria,pagos WHERE pagos.ID_Usuario=usuarios.ID_Usuario;";
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
        public function buscarUsuarios(){

        }
        public function ActualizarUsuarios(){
            
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