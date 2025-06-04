<?php
require_once("conexion.php");


class productos
{
    private $db;
    private $id;
    private $nombre;
    private $descripcion;
    private $precio;
    private $stock;
    private $tamano;
    private $color;
    private $img_url;
    private $genero;
    private $categoria;


    // Constructor
    public function __construct()
    {
        $this->db = new con();
        $this->id = 0;
        $this->nombre = "";
        $this->descripcion = "";
        $this->precio = 0;
        $this->stock = 0;
        $this->tamano = "";
        $this->color = "";
        $this->img_url = "";
        $this->genero = "";
        $this->categoria = 0;
    }


    // Método para obtener todos los productos
    public function getAll()
    {
        $sent = "SELECT * FROM productos";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();


        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }


        $consulta->close();
        return $productos;
    }
    public function getProd($id)
    {
        $sent = "SELECT * FROM productos where id_productos=?";
        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("i", $id);
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();


        if ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
        }


        $consulta->close();
        return $producto;
    }
    public function getProdHombre($nomCat = null)
    {
        $sent = "SELECT productos.* FROM productos,categoria where productos.categoria = categoria.ID_Categoría and Genero='men'";
        if ($nomCat !== null) {
            $sent .= "and categoria.Nombre_Categoría = ? ";
        }
        $consulta = $this->db->getCon()->prepare($sent);


        if ($nomCat !== null) {
            $consulta->bind_param("s", $nomCat);
        }
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();


        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }


        $consulta->close();
        return $productos;
    }
    public function getProdMujer($nomCat = null)
    {
        $sent = "SELECT productos.*  FROM productos,categoria where productos.categoria = categoria.ID_Categoría and Genero='woman' ";
        if ($nomCat !== null) {
            $sent .= "and categoria.Nombre_Categoría = ? ";
        }
        $consulta = $this->db->getCon()->prepare($sent);


        if ($nomCat !== null) {
            $consulta->bind_param("s", $nomCat);
        }
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();


        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }


        $consulta->close();
        return $productos;
    }
    public function getProdExclusive($nomCat = null)
    {
        $sent = "SELECT productos.*  FROM productos,categoria where productos.categoria = categoria.ID_Categoría and Genero='exclusive'";
        if ($nomCat !== null) {
            $sent .= "and categoria.Nombre_Categoría = ? ";
        }
        $consulta = $this->db->getCon()->prepare($sent);


        if ($nomCat !== null) {
            $consulta->bind_param("s", $nomCat);
        }
        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
        $consulta->execute();


        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }


        $consulta->close();
        return $productos;
    }
    // Método para insertar un producto
    public function insertar($nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria)
    {
        try {
            $sent = "INSERT INTO productos (nombre, descripcion, precio, stock, tamano, color, img_URL, genero, categoria)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("ssdiisssi", $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);
            if ($consulta->execute()) {
                return true;
            } else {
                throw new Exception("Error al ejecutar la consulta: " . $consulta->error);
            }
        } catch (Exception $e) {
            error_log("Error en insertar: " . $e->getMessage());
            return false;
        }
    }


    // Método para eliminar un producto
    public function eliminar($id)
    {
        try {
            $sent = "DELETE FROM productos WHERE id_productos  = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("i", $id);
            if ($consulta->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            error_log("Error en eliminar: " . $e->getMessage());
            return false;
        }
    }
    // Método para actualizar un producto
    public function actualizar($nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria, $ID_Productos)
    {
        $sent = "UPDATE productos SET
            nombre = ?,
            descripcion = ?,
            precio = ?,
            stock = ?,
            tamano = ?,
            color = ?,
            img_url=?,
            genero = ? ,
            categoria = ?
            WHERE id_productos = ?";
        // Preparar la sentencia
        $consulta = $this->db->getCon()->prepare($sent);


        // Vincular los parámetros
        $consulta->bind_param("ssiissssii", $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria, $ID_Productos);


        // Ejecutar la consulta
        if ($consulta->execute()) {
            return true; // Actualización exitosa
        } else {
            // Cerrar la sentencia
            $consulta->close();
            return false;
        }
    }
    // Método para actualizar las imágenes de un producto
    public function actualizarImagenes($id, $imagenes)
    {
        try {
            $sent = "UPDATE productos SET img_url = ? WHERE id_productos   = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("si", $imagenes, $id);
            if ($consulta->execute()) {
                return true;
            } else {
                throw new Exception("Error al ejecutar la consulta: " . $consulta->error);
            }
        } catch (Exception $e) {
            error_log("Error en actualizarImagenes: " . $e->getMessage());
            return false;
        }
    }
    public function getCarrito($id)
    {
        $sent = "SELECT carrito.ID_Carrito, p.* ,añade.Cantidad from productos p , carrito, añade , usuarios WHERE carrito.ID_Carrito = añade.ID_Carrito AND p.id_productos = añade.ID_Producto and carrito.ID_Usuario = usuarios.ID_Usuario and carrito.pagado=0 and usuarios.ID_Usuario = ?";


        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("i", $id);
        $consulta->execute();


        $result = $consulta->get_result();


        $productos = [];
        while ($row = $result->fetch_object()) {
            $productos[] = $row;
        }


        $consulta->close();
        return $productos;
    }
    public function eliminarProdCarrito($id, $idProd)
    {
        $sent = "DELETE FROM añade
                WHERE
                ID_Carrito IN (
                    SELECT ID_Carrito
                    FROM carrito
                    WHERE pagado = 0 AND ID_Usuario = ?
                )
                AND id_productos  = ?";


        $consulta = $this->db->getCon()->prepare($sent);


        if (!$consulta) {
            error_log("Error en prepare: " . $this->db->getCon()->error);
            return false;
        }


        $consulta->bind_param("ii", $id, $idProd);


        if (!$consulta->execute()) {
            error_log("Error en execute: " . $consulta->error);
            return false;
        }


        $affected = $consulta->affected_rows;
        $consulta->close();


        return $affected > 0; // true si se eliminó algo, false si no
    }
    public function buscarProd($nombre)
    {
        $sent = "SELECT * FROM productos WHERE productos.nombre LIKE ?";


        $consulta = $this->db->getCon()->prepare($sent);


        // Agregar comodines al parámetro
        $param = "%" . $nombre . "%";


        $consulta->bind_param("s", $param);


        $consulta->execute();


        $consulta->bind_result($id, $nombre, $descripcion, $precio, $stock, $tamano, $color, $img_url, $genero, $categoria);


        $productos = [];
        while ($consulta->fetch()) {
            $producto = new stdClass();
            $producto->id = $id;
            $producto->nombre = $nombre;
            $producto->descripcion = $descripcion;
            $producto->precio = $precio;
            $producto->stock = $stock;
            $producto->tamano = $tamano;
            $producto->color = $color;
            $producto->img_url = $img_url;
            $producto->genero = $genero;
            $producto->categoria = $categoria;
            $productos[] = $producto;
        }


        $consulta->close();
        return $productos;
    }
    public function pagoProd($id_carrito, $preciopagado, $id_usuario, $productos)
    {
        try {
            // 1. Marcar el carrito como pagado
            $sent = "UPDATE carrito SET pagado = 1 WHERE ID_Carrito = ?";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("i", $id_carrito);
            $consulta->execute();


            // 2. Actualizar el stock para cada producto
            foreach ($productos as $producto) {
                $sent = "UPDATE productos SET stock = stock - ? WHERE id_productos  = ?";
                $consulta = $this->db->getCon()->prepare($sent);
                $consulta->bind_param("ii", $producto['cantidad'], $producto['id']);
                $consulta->execute();
            }


            // 3. Registrar el pago
            $sent = "INSERT INTO pagos (ID_Pago, Fecha_Pago, Monto, Metodo_Pago, ID_Usuario, Id_carrito)
                    VALUES (NULL, CURRENT_TIMESTAMP, ?, 'Card', ?, ?)";
            $consulta = $this->db->getCon()->prepare($sent);
            $consulta->bind_param("dii", $preciopagado, $id_usuario, $id_carrito);
            $consulta->execute();


            return true;
        } catch (Exception $th) {
            // Log del error para debugging
            error_log("Error en pagoProd: " . $th->getMessage());
            return false;
        }
    }
    public function getprodsFav($ids)
    {
        if (is_string($ids)) {
            $ids = json_decode($ids, true);
        }

        // Verificar que sea un array y no esté vacío
        if (!is_array($ids) || empty($ids)) {
            return [];
        }

        // Generar los placeholders para la consulta
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        $sent = "SELECT p.* FROM productos p WHERE id_productos IN ($placeholders)";

        $consulta = $this->db->getCon()->prepare($sent);

        $types = str_repeat('i', count($ids));

        // Utilizar el operador splat para pasar los parámetros
        $consulta->bind_param($types, ...$ids);

        $consulta->execute();

        $result = $consulta->get_result();

        $productos = [];
        while ($row = $result->fetch_object()) {
            $productos[] = $row;
        }

        $consulta->close();
        return $productos;
    }

    public function addAFav($id_usuario, $ids_productos)
    {
        if (empty($ids_productos)) {
            return false; // No hay productos para añadir
        }


        // 1. Filtramos los productos que YA están en favoritos
        $ids_a_insertar = [];
        foreach ($ids_productos as $id_producto) {
            if (!$this->isProductoInFavoritos($id_usuario, $id_producto)) {
                $ids_a_insertar[] = $id_producto;
            }
        }

        // Si no hay productos nuevos, retornamos false
        if (empty($ids_a_insertar)) {
            return false;
        }

        // 2. Preparamos el INSERT solo para productos no existentes
        $values = implode(',', array_fill(0, count($ids_a_insertar), '(?, ?)'));
        $sent = "INSERT INTO favoritos (id_usuario, id_producto) VALUES $values";

        $consulta = $this->db->getCon()->prepare($sent);

        // 3. Generamos los parámetros dinámicos
        $types = str_repeat('ii', count($ids_a_insertar));
        $params = [];
        foreach ($ids_a_insertar as $id_producto) {
            $params[] = $id_usuario;
            $params[] = $id_producto;
        }

        $consulta->bind_param($types, ...$params);
        $success = $consulta->execute();
        $consulta->close();

        return $success;
    }


    // Función auxiliar para verificar si un producto ya está en favoritos
    private function isProductoInFavoritos($id_usuario, $id_producto)
    {
        $sent = "SELECT COUNT(*) as total
                FROM favoritos
                WHERE id_usuario = ? AND id_producto = ?";

        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("ii", $id_usuario, $id_producto);
        $consulta->execute();

        $result = $consulta->get_result();
        $row = $result->fetch_assoc();

        $consulta->close();
        return ($row['total'] > 0);
    }
    public function getFavoritosByUsuario($id_usuario)
    {
        $sent = "SELECT p.*
             FROM favoritos f
             JOIN productos p ON f.id_producto = p.id_productos 
             WHERE f.id_usuario = ?";


        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("i", $id_usuario);
        $consulta->execute();


        $result = $consulta->get_result();


        $favoritos = [];
        while ($row = $result->fetch_object()) {
            $favoritos[] = $row;
        }


        $consulta->close();
        return $favoritos;
    }
    public function removeFromFavoritos($id_usuario, $id_producto)
    {
        $sent = "DELETE FROM favoritos
             WHERE id_usuario = ? AND id_producto = ?";

        $consulta = $this->db->getCon()->prepare($sent);
        $consulta->bind_param("ii", $id_usuario, $id_producto);
        $success = $consulta->execute();

        $consulta->close();
        return $success;
    }
}
