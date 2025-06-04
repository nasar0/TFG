-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2025 a las 10:50:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `añade`
--

CREATE TABLE `añade` (
  `ID_Carrito` bigint(100) NOT NULL,
  `ID_Producto` bigint(100) NOT NULL,
  `Cantidad` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `añade`
--

INSERT INTO `añade` (`ID_Carrito`, `ID_Producto`, `Cantidad`) VALUES
(1, 1, 1),
(1, 4, 1),
(1, 5, 1),
(1, 8, 1),
(1, 10, 1),
(1, 11, 1),
(3, 11, 1),
(6, 10, 1),
(7, 10, 1),
(8, 1, 1),
(8, 4, 1),
(8, 5, 1),
(8, 7, 1),
(9, 1, 1),
(10, 8, 1),
(11, 1, 1),
(11, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `ID_Carrito` bigint(100) NOT NULL,
  `ID_Usuario` bigint(100) NOT NULL,
  `pagado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`ID_Carrito`, `ID_Usuario`, `pagado`) VALUES
(1, 1, 1),
(3, 5, 0),
(6, 1, 1),
(7, 1, 1),
(8, 1, 1),
(9, 1, 1),
(10, 1, 1),
(11, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_Categoría` bigint(100) NOT NULL,
  `Nombre_Categoría` varchar(100) NOT NULL,
  `Descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_Categoría`, `Nombre_Categoría`, `Descripcion`) VALUES
(1, 'shoes', 'Explore Shoes to find the latest sneakers, boots, loafers and sliders including odsy, out of office and capsule collections from the Karmax™.'),
(2, 'clothing', 'Explore our Collection to discover t-shirts, shirts, sweatshirts, hoodies, pants and jackets featuring signature Karmax™ styles and detailing.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `id_usuario` bigint(100) NOT NULL,
  `id_producto` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `id_usuario`, `id_producto`) VALUES
(27, 1, 6),
(29, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `ID_Pago` bigint(100) NOT NULL,
  `Fecha_Pago` date NOT NULL,
  `Monto` decimal(10,2) NOT NULL,
  `Metodo_Pago` varchar(50) NOT NULL,
  `ID_Usuario` bigint(100) DEFAULT NULL,
  `Id_carrito` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`ID_Pago`, `Fecha_Pago`, `Monto`, `Metodo_Pago`, `ID_Usuario`, `Id_carrito`) VALUES
(3, '2025-03-02', 20.00, 'Card', NULL, 1),
(4, '2025-03-01', 20.00, 'Card', NULL, 1),
(5, '2025-05-15', 4423.00, 'Card', 1, 1),
(6, '2025-05-15', 15000.00, 'Card', 1, 6),
(7, '2025-05-15', 15000.00, 'Card', 1, 7),
(8, '2025-05-15', 1978.00, 'Card', 1, 8),
(9, '2025-05-15', 2740.00, 'Card', 1, 9),
(10, '2025-05-15', 1925.00, 'Card', 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posee`
--

CREATE TABLE `posee` (
  `ID_Producto` bigint(100) NOT NULL,
  `ID_Promocion` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_productos` bigint(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int(100) NOT NULL,
  `tamano` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `img_url` varchar(500) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `categoria` bigint(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_productos`, `nombre`, `descripcion`, `precio`, `stock`, `tamano`, `color`, `img_url`, `genero`, `categoria`) VALUES
(1, 'white/black low 3.0 off court', 'Influenced by iconic basketball styles, these low top 3.0 Off-Court sneakers are constructed with leather panels and a rubber sole. Complete with a \"ZIP TIE\" tag and signature labels', 548, 1, '40-41-42-43-44-45', 'white', '67f14c7139868_67ec1bc774563_67e7cbe1507c1_whiteblacklow3.0offcourt  (1).jpg,67f14c7eec5bc_67ec1bb2d8ea9_67e7cbe1508eb_whiteblacklow3.0offcourt  (2).jpg,67f14c7eec7f3_67ec1bc7742b4_67e7cbe150a0e_whiteblacklow3.0offcourt  (3).jpg,67f14c7eec996_67ec1bc77445a_67e7cbe150ca3_whiteblacklow3.0offcourt  (5).jpg', 'woman', 1),
(4, 'dusty blue/ice out of office suede', 'A hybrid of street, basketball and running styles heavily influenced by 90s subculture, these Out Of Office sneakers are constructed with a suede leather and recycled polyester upper and a rubber sole.', 490, 2, '40-41-42-43-44-45', 'blue,white', '67e7d1bf42aa2_dusty-blue-ice-out-of-office-suede_25836783_57975052_1000.jpg,67e7d1bf42d4f_dusty-blue-ice-out-of-office-suede_25836783_57975053_1000.jpg,67e7d1bf43001_dusty-blue-ice-out-of-office-suede_25836783_57975058_1000.jpg,67e7d1bf43216_dusty-blue-ice-out-of-office-suede_25836783_57975059_1000.jpg,67e7d1bf43408_dusty-blue-ice-out-of-office-suede_25836783_57975060_1000.jpg', 'exclusive', 1),
(5, 'white/blue star out of office', 'A hybrid of street, basketball and running styles heavily influenced by 90s subculture, these Out Of Office sneakers are constructed with a leather and recycled polyester upper and a rubber sole. This pair features star embellishments.', 590, 0, '40-41-42-43-44-45', 'white', '67e7d1d12bb23_white-blue-star-out-of-office_25478819_57974960_1000.jpg,67e7d1d12b7e4_white-blue-star-out-of-office_25478819_57974959_1000.jpg,67e7d1d12be1b_white-blue-star-out-of-office_25478819_57974961_1000.jpg,67e7d1d12c1b5_white-blue-star-out-of-office_25478819_57974962_1000.jpg,67e7d1d12c3ab_white-blue-star-out-of-office_25478819_57974969_1000.jpg', 'exclusive', 1),
(6, 'silver/turquoise be right back', 'The Be Right Back sneakers channel performance running aesthetics into an everyday silhouette. Crafted from a combination of mesh and synthetic leather, they feature multiple signature brand design elements and dynamic arrow language.€', 465, 0, '40-41-42-43-44-45', 'green', '67e7d44cc4ebb_silver-turquoise-be-right-back_26417576_57975215_1000.jpg,67e7d44cc51df_silver-turquoise-be-right-back_26417576_57975216_1000.jpg,67e7d44cc54ea_silver-turquoise-be-right-back_26417576_57975218_1000.jpg,67e7d44cc577a_silver-turquoise-be-right-back_26417576_57975219_1000.jpg,67e7d44cc59e2_silver-turquoise-be-right-back_26417576_57975220_1000.jpg', 'exclusive', 1),
(7, 'black vintage putti t-shirt', 'This 100% cotton t-shirt has a vintage-style fade and features a small stamp logo and large fresco graphic with cherubs. Skate fit.', 350, 0, 'xs-s-m-l-xl', 'black', '67e7def44d2b1_black-vintage-putti-t-shirt_26417588_57288399_2048.jpg,67e7df03d3411_black-vintage-putti-t-shirt_26417588_57288369_2048.jpg,67e7df03d36fe_black-vintage-putti-t-shirt_26417588_57288370_2048.jpg,67e7df03d3985_black-vintage-putti-t-shirt_26417588_57288373_2048.jpg,67e7df03d3b6e_black-vintage-putti-t-shirt_26417588_57288376_2048.jpg', 'men', 2),
(8, 'green stamp crocodile mesh long-sleeved top', 'This long-sleeved mesh top features a small stamp logo and a crocodile print finish. Made in Italy.', 385, 0, 'xs', 'green', '67eae74655673_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899077_1000.jpg,67eae753aa0af_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899073_1000.jpg,67eae763e2c57_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899076_1000.jpg,67eae76e178c8_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899074_1000.jpg,67eae77599bc7_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899075_1000.jpg', 'woman', 2),
(9, 'beige stitch cargo pants', 'These straight fit pants are crafted from 100% cotton and feature large cargo pockets with a bookish logo and a contrasting waistband. Made in Italy.', 550, 4, 'xs-s-m-l-xl', 'beige', '67eae92900b54_off-white-beige-stitch-cargo-pants_25477970_57882474_1000.jpg,67eae92fda0a7_off-white-beige-stitch-cargo-pants_25477970_57882448_1000.jpg,67eae938442fa_off-white-beige-stitch-cargo-pants_25477970_57882446_1000.jpg,67eae93e7abea_off-white-beige-stitch-cargo-pants_25477970_57882477_1000.jpg,67eae94647082_off-white-beige-stitch-cargo-pants_25477970_57882471_1000.jpg', 'men', 2),
(10, 'nike af1 mid graffiti c/o', 'Air Force 1 Mid Graffiti featuring airbrush style Grim Reaper graphic, kkarmx™️logo script and embroidered Air branding on the tongue plus semi-translucent swooshes and visible orange air bag. Complete with dual lacing system, spiked rubber sole, additional rubber sole inserts and ‘gobstopper’ color reveal.', 1500, 0, '40-41-42-43-44-45', 'white', '67f14dd98fd4e_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558605_1000.jpg,67f14deb595e9_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45557965_1000.jpg,67f14deb5985f_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45557967_1000.jpg,67f14deb59a83_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558603_1000.jpg,67f14deb59c0e_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558604_1000.jpg', 'exclusive', 1),
(11, 'black fresco souvenir varsity jacket', 'This jacquard varsity jacket features an all-over fresco design with cherubs and cars. Made in Italy.', 1295, 9, 'xs-s-m-l-xl', 'black', '67f2ad9f0848d_black-fresco-souvenir-varsity-jacket_25836959_56893587_1000.jpg,67f2ada8424d1_black-fresco-souvenir-varsity-jacket_25836959_56893568_1000.jpg,67f2ada842a7a_black-fresco-souvenir-varsity-jacket_25836959_56893569_1000.jpg,67f2ada843143_black-fresco-souvenir-varsity-jacket_25836959_56893571_1000.jpg,67f2ada8434b5_black-fresco-souvenir-varsity-jacket_25836959_56893573_1000.jpg', 'men', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `ID_Promocion` bigint(100) NOT NULL,
  `Nombre_Promocion` varchar(100) NOT NULL,
  `Descripción` text NOT NULL,
  `Descuento` decimal(5,2) NOT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `promociones`
--

INSERT INTO `promociones` (`ID_Promocion`, `Nombre_Promocion`, `Descripción`, `Descuento`, `Fecha_Inicio`, `Fecha_Fin`) VALUES
(1, 'free for all', 'todo gratis', 100.00, '2025-02-27', '2035-03-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` bigint(100) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasenna` varchar(255) NOT NULL,
  `Dirección` varchar(255) NOT NULL,
  `Teléfono` varchar(15) NOT NULL,
  `Rol` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `Nombre`, `Correo`, `Contrasenna`, `Dirección`, `Teléfono`, `Rol`) VALUES
(1, 'nasrallah', 'nasaro@g', 'nasaro', '', '999999999', 0),
(5, 'Victoria', 'vburgoaa@gmail.com', '1234', '', '+34 632 453 321', 1),
(6, '1', '1', '1', '1', '1', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `añade`
--
ALTER TABLE `añade`
  ADD PRIMARY KEY (`ID_Carrito`,`ID_Producto`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`ID_Carrito`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_Categoría`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fav_prod` (`id_producto`),
  ADD KEY `fk_fav_usu` (`id_usuario`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`ID_Pago`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `carrito_pagos` (`Id_carrito`);

--
-- Indices de la tabla `posee`
--
ALTER TABLE `posee`
  ADD PRIMARY KEY (`ID_Producto`,`ID_Promocion`),
  ADD KEY `ID_Promocion` (`ID_Promocion`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_productos`),
  ADD KEY `fk_prod_cat` (`categoria`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`ID_Promocion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Correo_2` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `ID_Carrito` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_Categoría` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `ID_Pago` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_productos` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `ID_Promocion` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `añade`
--
ALTER TABLE `añade`
  ADD CONSTRAINT `añade_ibfk_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`),
  ADD CONSTRAINT `añade_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`id_productos`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `fk_fav_prod` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_productos`),
  ADD CONSTRAINT `fk_fav_usu` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `carrito_pagos` FOREIGN KEY (`Id_carrito`) REFERENCES `carrito` (`ID_Carrito`),
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `posee`
--
ALTER TABLE `posee`
  ADD CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`id_productos`),
  ADD CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`ID_Promocion`) REFERENCES `promociones` (`ID_Promocion`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_prod_cat` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`ID_Categoría`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
