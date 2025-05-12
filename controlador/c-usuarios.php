<?php
require_once("../modelo/usuarios.php");
$GLOBALUSER = new usuarios();

// Hacer que las cabeceras permitan cookies
require_once("./headers.php");



// Leer los datos JSON enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["action"])) {
    echo json_encode(["success" => false, "message" => "Acción no definida"]);
    exit;
}

switch ($data["action"]) {
    case "crearSesion":
        session_start();
        $_SESSION["email"] = $data["email"]; 
        $_SESSION["id"] = $data["id"];
        break;
    case "getSesion":
        session_start();
        echo json_encode($_SESSION);
        break;
    case "verificar":
        if (empty($data["email"]) || empty($data["password"])) {
            echo json_encode(["success" => false, "message" => "Datos incompletos"]);
            exit;
        }

        $rol = $GLOBALUSER->iniciar_sesion($data["email"], $data["password"]);

        if ($rol !== false) {
            setcookie("validacion", "true", [
                'expires' => time() + 7200,
                'path' => '/', // Accesible en todo el dominio
                'secure' => true,
                'httponly' => false, // Permite acceso desde JavaScript
            ]);

            setcookie("rol", $rol, [
                'expires' => time() + 7200,
                'path' => '/',
                'secure' => true,
                'httponly' => false,
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Logeado",
                "rol" => (int) $rol
            ]);

            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos"]);
            exit;
        }
        break;
    case "logout":
        setcookie("validacion", "", [
            'expires' => time() - 7200,
            'path' => '/',
            'secure' => true,
            'httponly' => false,
        ]);

        setcookie("rol", "", [
            'expires' => time() - 7200,
            'path' => '/',
            'secure' => true,
            'httponly' => false,
        ]);
        session_start();       
        session_destroy();
        break;
    case "estadisticas":
        $est = $GLOBALUSER->estadisticas();
        echo json_encode($est);
        break;
    case "listar":
        $lista = $GLOBALUSER->listarUsuarios();
        echo json_encode($lista);
        break;
    case "listarEmail":
        $email = $data["email"];
        $lista = $GLOBALUSER->listarUsuariosByEmail($email);
        echo json_encode($lista);
        break;
    case "eliminar":
        $id = $data["id"];
        $resultado = $GLOBALUSER->EliminarUsuarios($id);

        if ($resultado === true) {
            echo json_encode(["success" => true, "message" => "Usuario eliminado correctamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al eliminar el usuario" . $id]);
        }
        break;
    case "crearUser":
        $resultado = $GLOBALUSER->registro(
            $data["nombre"],
            $data["correo"],
            $data["contrasenna"],
            $data["direccion"],
            $data["telefono"]
        );
        echo json_encode([
            'success' => $resultado,
            'message' => $resultado ? "Usuario insertado correctamente" : "Error al insertar el Usuario",
            "value" => $resultado
        ]);
        break;
    case "modificar":
        // Verificar que los datos necesarios estén presentes
        if (!isset($data["id"])) {
            echo json_encode(["success" => false, "message" => "Datos incompletos para la modificación"]);
            exit;
        }

        // Extraer los datos del JSON
        $id_usuario = $data["id"];
        $nombre = $data["nombre"];
        $correo = $data["correo"];
        $direccion = $data["direccion"];
        $telefono = $data["telefono"];
        $rol = isset($data["rol"]) && $data["rol"] !== null && $data["rol"] !== '' ? $data["rol"] : null;


        try {
            $resultado = $GLOBALUSER->ActualizarUsuarios($nombre, $correo, $direccion, $telefono, $rol, $id_usuario);
            if ($resultado) {
                echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al actualizar el usuario"]);
            }
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;
    case "agregar":
        try {
            $resultado = $GLOBALUSER->agregarCarrito($data["idUsuario"], $data["idProducto"]);
            if ($resultado) {
                echo json_encode(["success" => true, "message" => "Usuario agregado correctamente"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al actualizar al agregar al carrito"]);
            }
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;
    default:
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
        break;
}
