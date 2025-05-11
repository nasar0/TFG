<?php
require_once("../modelo/promociones.php");
$GLOBALPROMOCIONES = new promociones();

// Configurar cabeceras para permitir CORS
require_once("./headers.php");


// Leer los datos JSON enviados desde el frontend (para otras acciones)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["action"])) {
    echo json_encode(["success" => false, "message" => "Acción no definida"]);
    exit;
}

// Manejar otras acciones
switch ($data["action"]) {
    case "listar":
        $lista = $GLOBALPROMOCIONES->getAll();
        echo json_encode($lista);
        error_log(json_encode($lista));
        break;

    case "agregar":
        $resultado = $GLOBALPROMOCIONES->insertar(
            $data["nombre"],
            $data["descripcion"],
            $data["descuento"],
            $data["fechaInicio"],
            $data["fechaFin"]
        );
        echo json_encode([
            'success' => $resultado,
            'message' => $resultado ? "Promoción insertada correctamente" : "Error al insertar la promoción"
        ]);
        break;

    case "eliminar":
        $resultado = $GLOBALPROMOCIONES->eliminar($data["id"]);
        echo json_encode([
            'success' => $resultado === true,
            'message' => $resultado === true ? "Promoción eliminada correctamente" : "Error al eliminar la promoción"
        ]);
        break;

    case "modificar":
        $resultado = $GLOBALPROMOCIONES->actualizar(
            $data["nombre"],
            $data["descripcion"],
            $data["descuento"],
            $data["fechaInicio"],
            $data["fechaFin"],
            $data["id"]
        );
        echo json_encode([
            'success' => $resultado === true,
            'message' => $resultado === true ? "Promoción actualizada correctamente" : "Error al actualizar la promoción"
        ]);
        break;

    default:
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
        break;
}
?>