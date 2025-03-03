<?php 
    //Clase de la conexion a la base de datos
    class con{
        private $con;
        public function __construct() {

            require_once("../../cred.php");//Credenciales para el acceso a la base de datos 
            $this->con = new mysqli("localhost",USU_CON,PSW_CON,"tfg");
        }

        public function getCon() { 
            return $this->con; 
       } 
        
    }

	
?>