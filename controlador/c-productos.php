<?php
    require_once("../modelo/productos.php");
    $GLOBALPRODUCT = new productos();

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
        case "listar":
            $lista = $GLOBALPRODUCT->getAll();
            echo json_encode($lista);
            break;
        default:
            echo json_encode(["success" => false, "message" => "Acción no válida"]);
            break;
    }
?>
