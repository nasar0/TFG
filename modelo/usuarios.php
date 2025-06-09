<?php

// Se requiere la clase de conexión a la base de datos
require_once("conexion.php");

// Definición de la clase usuarios
class usuarios
{
    private $db; // Variable para la conexión a la base de datos
    private $id_usuario;
    private $nombre;
    private $correo;
    private $contrasena;
    private $direccion;
    private $telefono;
    private $rol;

    public function __construct()
    {
        $this->db = new con();
        $this->id_usuario = -1;
        $this->nombre = "";
        $this->correo = "";
        $this->contrasena = "";
        $this->direccion = "";
        $this->telefono = "";
        $this->rol = -1;
    }
    public function iniciar_sesion($ema, $cont)
    {
        $sent = "SELECT rol, Contrasenna FROM usuarios WHERE Correo = ?";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("s", $ema);
        $consulta->execute();
        $consulta->bind_result($rol, $hash_guardado);
        if ($consulta->fetch()) {
            $consulta->close();
            if (password_verify($cont, $hash_guardado)) {
                return $rol;
            } else {
                return false;
            }
        } else {
            $consulta->close();
            return false;
        }
    }
    public function registro($n, $correo, $con, $dir, $tel)
    {
        $pass = password_hash($con, PASSWORD_DEFAULT);

        // Verifica si el correo ya está en uso
        $sent = "SELECT ID_Usuario FROM usuarios WHERE Correo = ?";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("s", $correo);
        $consulta->execute();
        $consulta->store_result();

        if ($consulta->num_rows > 0) {
            $consulta->close();
            return [
                "result" => false,
                "message" => "Email already exists"
            ];
        }
        $consulta->close();

        // Si no existe, procede con el registro
        try {
            $sent = "INSERT INTO usuarios (`ID_Usuario`, `Nombre`, `Correo`, `Contrasenna`, `Dirección`, `Teléfono`, `Rol`)
                VALUES (NULL, ?, ?, ?, ?, ?, 1);";
            $consulta = $this->db->getCon()->prepare($sent);
            if (!$consulta) {
                throw new Exception("Prepare failed: " . $this->db->getCon()->error);
            }
            $consulta->bind_param("sssss", $n, $correo, $pass, $dir, $tel);
            if (!$consulta->execute()) {
                throw new Exception("Execute failed: " . $consulta->error);
            }
            $consulta->close();
            return [
                "id" => $this->db->getCon()->insert_id,
                "result" => true,
                "message" => "User registered successfully"
            ];
        } catch (Exception $e) {
            return [
                "result" => false,
                "message" => "Error: " . $e->getMessage()
            ];
        }
    }


    public function estadisticas()
    {
        $sent = "SELECT (SELECT COUNT(*) FROM usuarios) AS TotalUsuarios, (SELECT COUNT(*) FROM productos) AS TotalProductos,(SELECT COUNT(*) FROM categoria) AS TotalCategorias,(SELECT SUM(Monto) FROM pagos) AS TotalPagos FROM dual;";
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
    public function listarUsuarios()
    {
        $sent = "SELECT * FROM usuarios";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->execute();
        $consulta->bind_result($id, $nom, $cor, $pas, $dir, $tel, $rol);

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
    public function listarUsuariosByEmail($correo)
    {
        $sent = "SELECT u.ID_Usuario,u.Nombre,u.Correo,u.Dirección,u.Teléfono,u.Rol FROM usuarios u WHERE Correo=?";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("s", $correo);
        $consulta->execute();
        $consulta->bind_result($id, $nom, $cor, $dir, $tel, $rol);

        $usuario = new stdClass();
        if ($consulta->fetch()) {

            $usuario->id_usuario = $id;
            $usuario->nombre = $nom;
            $usuario->correo = $cor;
            $usuario->direccion = $dir;
            $usuario->telefono = $tel;
            $usuario->rol = $rol;
        }

        $consulta->close();
        return $usuario;
    }
    public function ActualizarUsuarios($nombre, $correo, $direccion, $telefono, $id_usuario, $rol = null)
    {
        // Base de la consulta y tipos
        $sql = "UPDATE usuarios SET 
                        Nombre = ?, 
                        Correo = ?, 
                        Dirección = ?, 
                        Teléfono = ?";
        $tipos = "ssss";
        $parametros = [$nombre, $correo, $direccion, $telefono];

        // Si se proporciona un rol, se agrega a la consulta
        if ($rol !== null) {
            $sql .= ", Rol = ?";
            $tipos .= "i";
            $parametros[] = $rol;
        }

        $sql .= " WHERE ID_Usuario = ?";
        $tipos .= "i";
        $parametros[] = $id_usuario;

        // Preparar y ejecutar la consulta
        $consulta = $this->db->getCon()->prepare($sql);
        if (!$consulta) {
            return false;
        }

        $consulta->bind_param($tipos, ...$parametros);

        $resultado = $consulta->execute();
        $consulta->close();

        return $resultado;
    }

    public function EliminarUsuarios($id)
    {
        try {
            $con = $this->db->getCon();
            $con->begin_transaction();

            // 1. Mantener los pagos pero desvincular el usuario
            $sent = "UPDATE pagos SET Id_carrito = NULL WHERE Id_carrito IN (SELECT ID_Carrito FROM carrito WHERE ID_Usuario = ?)";
            $consulta = $con->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $consulta->close();

            // Antes de eliminar el usuario, desvincula pagos
            $sent = "UPDATE pagos SET ID_Usuario = NULL WHERE ID_Usuario = ?";
            $consulta = $con->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $consulta->close();

            // 2. Obtener los ID_Carrito que tienen ID_Usuario = ?
            $sent = "SELECT ID_Carrito FROM carrito WHERE ID_Usuario = ?";
            $consulta = $con->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $result = $consulta->get_result();
            $carritos = [];
            while ($row = $result->fetch_assoc()) {
                $carritos[] = $row['ID_Carrito'];
            }
            $consulta->close();

            if (!empty($carritos)) {
                // Convertir array en lista para IN
                $placeholders = implode(',', array_fill(0, count($carritos), '?'));

                // 3. Eliminar en añade
                $sent = "DELETE FROM añade WHERE ID_Carrito IN ($placeholders)";
                $consulta = $con->prepare($sent);

                // Vincular parámetros dinámicamente
                $tipos = str_repeat('i', count($carritos));
                $consulta->bind_param($tipos, ...$carritos);
                $consulta->execute();
                $consulta->close();

                // 4. Eliminar carritos
                $sent = "DELETE FROM carrito WHERE ID_Carrito IN ($placeholders)";
                $consulta = $con->prepare($sent);
                $consulta->bind_param($tipos, ...$carritos);
                $consulta->execute();
                $consulta->close();
            }

            // 5. Eliminar favoritos
            $sent = "DELETE FROM favoritos WHERE id_usuario = ?";
            $consulta = $con->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $consulta->close();

            // 6. Eliminar usuario
            $sent = "DELETE FROM usuarios WHERE ID_Usuario = ?";
            $consulta = $con->prepare($sent);
            $consulta->bind_param("i", $id);
            $consulta->execute();
            $consulta->close();

            $con->commit();
            return true;
        } catch (Exception $e) {
            $this->db->getCon()->rollback();
            return false;
        }
    }


    public function agregarCarrito($idUsuario, $idProducto)
    {
        $this->db->getCon()->begin_transaction();

        try {
            // Verificar si ya tiene un carrito
            $sent = "SELECT ID_Carrito FROM carrito WHERE ID_Usuario = ? and pagado = 0";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("i", $idUsuario);
            $consulta->execute();
            $consulta->bind_result($idCarrito);
            $consulta->fetch();
            $consulta->close();

            // Si no existe, crear uno nuevo
            if (!$idCarrito) {
                $sent = "INSERT INTO carrito (ID_Usuario) VALUES (?)";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("i", $idUsuario);
                $consulta->execute();
                $idCarrito = $this->db->getCon()->insert_id;
                $consulta->close();

                if (!$idCarrito) {
                    throw new Exception("No se pudo crear el carrito");
                }
            }

            // Agregar el producto al carrito
            // Primero verificar si ya existe el producto en el carrito
            $sent = "SELECT Cantidad FROM añade WHERE ID_Carrito = ? AND ID_Producto = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ii", $idCarrito, $idProducto);
            $consulta->execute();
            $consulta->bind_result($cantidad);
            $existeProducto = $consulta->fetch();
            $consulta->close();

            if (!$existeProducto) {
                //Si no existe, insertar nuevo registro
                $sent = "INSERT INTO añade (ID_Carrito, ID_Producto, Cantidad) 
                             VALUES (?, ?, 1)";
            }

            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ii", $idCarrito, $idProducto);
            $consulta->execute();
            $consulta->close();

            $this->db->getCon()->commit();
            return true;
        } catch (Exception $e) {
            $this->db->getCon()->rollback();
            return false;
        }
    }
    function cambiarContrasena($id, $contrasena)
    {

        $pass = password_hash($contrasena, PASSWORD_DEFAULT);
        $sent = "UPDATE usuarios SET Contrasenna = ? WHERE ID_Usuario = ?";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("si", $pass, $id);
        $consulta->execute();
        $consulta->close();
        return true;
    }
    public function n_carrito($id)
    {
        $sent = "SELECT COUNT(añade.ID_Carrito) FROM añade, carrito WHERE carrito.ID_Carrito = añade.ID_Carrito and carrito.ID_Usuario = ? and carrito.pagado = 0;";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("i", $id);
        error_log($sent);
        error_log($id);
        $consulta->execute();
        $consulta->bind_result($n_carrito);
        $consulta->fetch();
        $consulta->close();
        return $n_carrito;
    }
}
