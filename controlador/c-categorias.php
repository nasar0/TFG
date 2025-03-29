<?php
    require_once("../modelo/categorias.php");
    $GLOBALCATEGORIAS = new categorias();

// Configurar cabeceras para permitir CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');


// Leer los datos JSON enviados desde el frontend (para otras acciones)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["action"])) {
    echo json_encode(["success" => false, "message" => "Acción no definida"]);
    exit;
}

// Manejar otras acciones
switch ($data["action"]) {
    case "listar":
            $lista = $GLOBALCATEGORIAS->getAll();
            echo json_encode($lista);
        break;
    case "agregar":
        $resultado = $GLOBALCATEGORIAS->insertar(
            $data["nombre"],
            $data["descripcion"]
        );
        echo json_encode([
            'success' => $resultado,
            'message' => $resultado ? "categoria insertado correctamente" : "Error al insertar el categorias"
        ]);
        break;
    case "eliminar":
        $resultado = $GLOBALCATEGORIAS->eliminar($data["id"]);
        echo json_encode([
            'success' => $resultado === true,
            'message' => $resultado === true ? "categorias eliminado correctamente" : "Error al eliminar el categorias"
        ]);
        break;
    case "modificar":
            $resultado = $GLOBALCATEGORIAS->actualizar(
                $data["nombre"],
                $data["descripcion"],
                $data["id"]
            );
            echo json_encode([
                'success' => $resultado === true,
                'message' => $resultado === true ? "Producto actualizado correctamente" : "Error al eliminar el producto"
            ]);
        break;
    default:
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
        break;
}
?>