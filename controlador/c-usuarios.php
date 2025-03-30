<?php
    require_once("../modelo/usuarios.php");
    $GLOBALUSER = new usuarios();

    // Hacer que las cabeceras permitan cookies
    header('Access-Control-Allow-Origin: http://localhost:5173'); // Cambia esto al origen de tu frontend
    header('Access-Control-Allow-Methods: POST, GET');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true'); // Necesario para permitir el envío de cookies


    // Leer los datos JSON enviados desde el frontend
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["action"])) {
        echo json_encode(["success" => false, "message" => "Acción no definida"]);
        exit;
    }

    switch ($data["action"]) {
        case "verificar":
            if (empty($data["email"]) || empty($data["password"])) {
                echo json_encode(["success" => false, "message" => "Datos incompletos"]);
                exit;
            }
        
            $rol = $GLOBALUSER->iniciar_sesion($data["email"], $data["password"]);
        
            if ($rol !== false) {
                setcookie("validacion", "true", [
                    'expires' => time() + 1, 
                    'path' => '/', // Accesible en todo el dominio
                    'secure' => true, 
                    'httponly' => false, // Permite acceso desde JavaScript
                ]);
        
                setcookie("rol", $rol, [
                    'expires' => time() + 1,
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
                  echo json_encode(["success" => false, "message" => "Error al eliminar el usuario".$id]);
                }
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
                $rol = $data["rol"];
                // Llamar a la función ActualizarUsuarios
                try {
                    $resultado = $GLOBALUSER->ActualizarUsuarios($nombre, $correo , $direccion, $telefono,$rol, $id_usuario);
                    
                    if ($resultado) {
                        echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Error al actualizar el usuario"]);
                    }
                } catch (Exception $e) {
                    echo json_encode(["success" => false, "message" => $e->getMessage()]);
                }
                break;
        default:
            echo json_encode(["success" => false, "message" => "Acción no válida"]);
            break;
    }
?>
