<?php
require_once("../modelo/productos.php");
$GLOBALPRODUCT = new productos();

// Configurar cabeceras para permitir CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Directorio donde se guardarán las imágenes
$directorio = "../vista/public/img/prods/";
if (!is_dir($directorio)) {
    mkdir($directorio, 0777, true); // Crear la carpeta si no existe
}

// Función para manejar la subida de imágenes
function handleImageUpload($directorio) {
    if (!isset($_FILES['imagen'])) {
        return false;
    }

    $nombresArchivos = [];
    $files = $_FILES['imagen'];

    // Verificar si se subieron múltiples archivos
    $isMultiple = is_array($files['name']);
    $fileCount = $isMultiple ? count($files['name']) : 1;

    for ($i = 0; $i < $fileCount; $i++) {
        $nombreArchivo = uniqid() . '_' . basename($isMultiple ? $files['name'][$i] : $files['name']); // Añadir un ID único al nombre del archivo
        $tmp_name = $isMultiple ? $files['tmp_name'][$i] : $files['tmp_name'];
        $rutaArchivo = $directorio . $nombreArchivo;

        if (move_uploaded_file($tmp_name, $rutaArchivo)) {
            $nombresArchivos[] = $nombreArchivo;
        } else {
            return false; // Error al mover el archivo
        }
    }

    return $nombresArchivos; // Devolver un array con los nombres de los archivos
}

// Manejar la subida de imágenes
// Manejar la subida de imágenes
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'subirImagenes') {
    $idProducto = $_POST['id'];
    $imagenesActuales = isset($_POST['imagenesActuales']) ? explode(',', $_POST['imagenesActuales']) : [];
    $nombresArchivos = [];
  
    // Verificar si se subieron nuevas imágenes
    if (isset($_FILES['imagen'])) {
      $nombresArchivos = handleImageUpload($directorio);
      if ($nombresArchivos === false) {
        echo json_encode([
          'success' => false,
          'message' => 'Error al subir las imágenes.',
        ]);
        exit;
      }
    }
  
    // Combinar las imágenes actuales con las nuevas (si las hay)
    $todasLasImagenes = array_merge($imagenesActuales, $nombresArchivos);
    if($todasLasImagenes[0] === '') $todasLasImagenes = array_slice($todasLasImagenes,1);
    $imagenesStr = implode(',', $todasLasImagenes);
  
    // Actualizar el producto en la base de datos con las nuevas imágenes
    $resultado = $GLOBALPRODUCT->actualizarImagenes($idProducto, $imagenesStr);
  
    if ($resultado) {
      echo json_encode([
        'success' => true,
        'message' => 'Imágenes actualizadas correctamente.',
        'url' => $imagenesStr, // Devolver las URLs de las imágenes separadas por comas
      ]);
    } else {
      echo json_encode([
        'success' => false,
        'message' => 'Error al actualizar las imágenes en la base de datos.',
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
    case "agregar":
        if (isset($data["img_url"])) {
            $resultado = $GLOBALPRODUCT->insertar(
                $data["nombre"],
                $data["descripcion"],
                $data["precio"],
                $data["stock"],
                $data["tamano"],
                $data["color"],
                $data["img_url"],
                $data["genero"],
                $data["categoria"]
            );
            echo json_encode([
                'success' => $resultado,
                'message' => $resultado ? "Producto insertado correctamente" : "Error al insertar el producto"
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "No se proporcionaron imágenes"]);
        }
        break;
    case "eliminar":
        $resultado = $GLOBALPRODUCT->eliminar($data["id"]);
        echo json_encode([
            'success' => $resultado === true,
            'message' => $resultado === true ? "Producto eliminado correctamente" : "Error al eliminar el producto"
        ]);
        break;
    case "modificar":
        $resultado = $GLOBALPRODUCT->actualizar(
            $data["nombre"],
            $data["descripcion"],
            $data["precio"],
            $data["stock"],
            $data["tamano"],
            $data["color"],
            $data["img_url"],
            $data["genero"],
            $data["categoria"],
            $data["id"]
        );
        echo json_encode([
            'success' => $resultado === true,
            'message' => $resultado === true ? "Producto actualizado correctamente" : "Error al actualizar el producto"
        ]);
        break;
    default:
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
        break;
}
?>