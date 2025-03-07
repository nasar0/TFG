<?php
require_once("../modelo/productos.php");
$GLOBALPRODUCT = new productos();

// Hacer que las cabeceras permitan cookies
header('Access-Control-Allow-Origin: http://localhost:5173'); // Cambia esto al origen de tu frontend
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true'); // Necesario para permitir el envío de cookies

// Directorio donde se guardarán las imágenes
$directorio = __DIR__ . "/../vista/src/assets/img/";
if (!is_dir($directorio)) {
    mkdir($directorio, 0777, true); // Crear la carpeta si no existe
}

// Verificar si se está subiendo una imagen
if (isset($_FILES['imagen'])) {
    $nombreArchivo = basename($_FILES['imagen']['name']);
    $rutaArchivo = $directorio . $nombreArchivo;

    // Mover el archivo subido a la carpeta de imágenes
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaArchivo)) {
        echo json_encode([
            'success' => true,
            'url' => $rutaArchivo, // URL de la imagen
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al mover el archivo.',
        ]);
    }
    exit;
}

// Leer los datos JSON enviados desde el frontend (para otras acciones)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["action"])) {
    echo json_encode(["success" => false, "message" => "Acción no definida"]);
    exit;
}

// Manejar otras acciones
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