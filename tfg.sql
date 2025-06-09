-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2025 a las 02:47:58
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
(6, 10, 1),
(7, 10, 1),
(8, 1, 1),
(8, 4, 1),
(8, 5, 1),
(8, 7, 1),
(9, 1, 1),
(10, 8, 1),
(11, 11, 1),
(12, 19, 1),
(13, 1, 1),
(14, 14, 1),
(14, 31, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `ID_Carrito` bigint(100) NOT NULL,
  `ID_Usuario` bigint(100) DEFAULT NULL,
  `pagado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`ID_Carrito`, `ID_Usuario`, `pagado`) VALUES
(1, 1, 1),
(6, 1, 1),
(7, 1, 1),
(8, 1, 1),
(9, 1, 1),
(10, 1, 1),
(11, 1, 1),
(12, 1, 1),
(13, 26, 0),
(14, 1, 0);

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
(2, 'clothing', 'Explore our Collection to discover t-shirts, shirts, sweatshirts, hoodies, pants and jackets featuring signature Karmax™ styles and detailing.'),
(3, 'bags', 'bags'),
(4, 'accessories', 'accessories'),
(5, 'jewelry', 'jewelry');

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
(42, 26, 5),
(43, 26, 8),
(44, 26, 1),
(45, 26, 9),
(70, 1, 24),
(71, 1, 19),
(72, 1, 16),
(73, 1, 30);

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
  `Id_carrito` bigint(100) DEFAULT NULL
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
(10, '2025-05-15', 1925.00, 'Card', 1, 10),
(11, '2025-06-05', 1295.00, 'Card', 1, 11),
(12, '2025-06-08', 0.00, 'Card', 1, 12),
(13, '2025-06-08', 24.65, 'Card', NULL, NULL),
(14, '2025-06-08', 17.85, 'Card', NULL, NULL);

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
(1, 'white/black low 3.0 off court', 'influenced by iconic basketball styles, these low top 3.0 off-court sneakers are constructed with leather panels and a rubber sole. complete with a \"zip tie\" tag and signature labels', 548, 1, '40-41-42-43-44-45', 'BEIGE', '67f14c7139868_67ec1bc774563_67e7cbe1507c1_whiteblacklow3.0offcourt  (1).jpg,67f14c7eec5bc_67ec1bb2d8ea9_67e7cbe1508eb_whiteblacklow3.0offcourt  (2).jpg,67f14c7eec7f3_67ec1bc7742b4_67e7cbe150a0e_whiteblacklow3.0offcourt  (3).jpg,67f14c7eec996_67ec1bc77445a_67e7cbe150ca3_whiteblacklow3.0offcourt  (5).jpg', 'woman', 1),
(4, 'dusty blue/ice out of office suede', 'a hybrid of street, basketball and running styles heavily influenced by 90s subculture, these out of office sneakers are constructed with a suede leather and recycled polyester upper and a rubber sole.', 490, 2, '40-41-42-43-44-45', 'BLUE,WHITE', '67e7d1bf42aa2_dusty-blue-ice-out-of-office-suede_25836783_57975052_1000.jpg,67e7d1bf42d4f_dusty-blue-ice-out-of-office-suede_25836783_57975053_1000.jpg,67e7d1bf43001_dusty-blue-ice-out-of-office-suede_25836783_57975058_1000.jpg,67e7d1bf43216_dusty-blue-ice-out-of-office-suede_25836783_57975059_1000.jpg,67e7d1bf43408_dusty-blue-ice-out-of-office-suede_25836783_57975060_1000.jpg', 'men', 1),
(5, 'white/blue star out of office', 'a hybrid of street, basketball and running styles heavily influenced by 90s subculture, these out of office sneakers are constructed with a leather and recycled polyester upper and a rubber sole. this pair features star embellishments.', 590, 0, '40-41-42-43-44-45', 'WHITE', '67e7d1d12bb23_white-blue-star-out-of-office_25478819_57974960_1000.jpg,67e7d1d12b7e4_white-blue-star-out-of-office_25478819_57974959_1000.jpg,67e7d1d12be1b_white-blue-star-out-of-office_25478819_57974961_1000.jpg,67e7d1d12c1b5_white-blue-star-out-of-office_25478819_57974962_1000.jpg,67e7d1d12c3ab_white-blue-star-out-of-office_25478819_57974969_1000.jpg', 'woman', 1),
(6, 'silver/turquoise be right back', 'the be right back sneakers channel performance running aesthetics into an everyday silhouette. crafted from a combination of mesh and synthetic leather, they feature multiple signature brand design elements and dynamic arrow language.€', 465, 0, '40-41-42-43-44-45', 'GREEN', '6845b48d96c54_OWIA289S25FAB003_7243_0.webp,6845b48d9718f_OWIA289S25FAB003_7243_1.jpg,6845b48d97504_OWIA289S25FAB003_7243_4.webp,6845b48d977cd_OWIA289S25FAB003_7243_5.webp,6845b48d97a94_OWIA289S25FAB003_7243_6.webp,6845b48d97d3a_OWIA289S25FAB003_7243_7.webp', 'exclusive', 1),
(7, 'black vintage putti t-shirt', 'this 100% cotton t-shirt has a vintage-style fade and features a small stamp logo and large fresco graphic with cherubs. skate fit.', 350, 90, 'xs-s-m-l-xl', 'BLACK', '67e7def44d2b1_black-vintage-putti-t-shirt_26417588_57288399_2048.jpg,67e7df03d3985_black-vintage-putti-t-shirt_26417588_57288373_2048.jpg,67e7df03d36fe_black-vintage-putti-t-shirt_26417588_57288370_2048.jpg,67e7df03d3411_black-vintage-putti-t-shirt_26417588_57288369_2048.jpg,67e7df03d3b6e_black-vintage-putti-t-shirt_26417588_57288376_2048.jpg', 'men', 2),
(8, 'green stamp crocodile mesh long-sleeved top', 'this long-sleeved mesh top features a small stamp logo and a crocodile print finish. made in italy.', 385, 0, 'xs', 'GREEN', '67eae753aa0af_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899073_1000.jpg,67eae74655673_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899077_1000.jpg,67eae763e2c57_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899076_1000.jpg,67eae76e178c8_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899074_1000.jpg,67eae77599bc7_green-stamp-crocodile-mesh-long-sleeved-top_25838097_56899075_1000.jpg', 'woman', 2),
(9, 'beige stitch cargo pants', 'these straight fit pants are crafted from 100% cotton and feature large cargo pockets with a bookish logo and a contrasting waistband. made in italy.', 550, 4, 'xs-s-m-l-xl', 'BEIGE', '67eae92900b54_off-white-beige-stitch-cargo-pants_25477970_57882474_1000.jpg,67eae92fda0a7_off-white-beige-stitch-cargo-pants_25477970_57882448_1000.jpg,67eae938442fa_off-white-beige-stitch-cargo-pants_25477970_57882446_1000.jpg,67eae93e7abea_off-white-beige-stitch-cargo-pants_25477970_57882477_1000.jpg,67eae94647082_off-white-beige-stitch-cargo-pants_25477970_57882471_1000.jpg', 'men', 2),
(10, 'nike af1 mid graffiti c/o', 'air force 1 mid graffiti featuring airbrush style grim reaper graphic, kkarmx™️logo script and embroidered air branding on the tongue plus semi-translucent swooshes and visible orange air bag. complete with dual lacing system, spiked rubber sole, additional rubber sole inserts and ‘gobstopper’ color reveal.', 1500, 0, '40-41-42-43-44-45', 'WHITE', '67f14dd98fd4e_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558605_1000.jpg,67f14deb595e9_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45557965_1000.jpg,67f14deb5985f_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45557967_1000.jpg,67f14deb59a83_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558603_1000.jpg,67f14deb59c0e_nike-x-nike-af1-mid-graffiti-c-o-off-white_18804066_45558604_1000.jpg', 'men', 1),
(11, 'black fresco souvenir varsity jacket', 'this jacquard varsity jacket features an all-over fresco design with cherubs and cars. made in italy.', 1295, 7, 'xs-s-m-l-xl', 'BLACK', '67f2ad9f0848d_black-fresco-souvenir-varsity-jacket_25836959_56893587_1000.jpg,67f2ada8424d1_black-fresco-souvenir-varsity-jacket_25836959_56893568_1000.jpg,67f2ada842a7a_black-fresco-souvenir-varsity-jacket_25836959_56893569_1000.jpg,67f2ada843143_black-fresco-souvenir-varsity-jacket_25836959_56893571_1000.jpg,67f2ada8434b5_black-fresco-souvenir-varsity-jacket_25836959_56893573_1000.jpg', 'men', 2),
(12, 'White/Black Out Of Office \"For Walking\"', 'a hybrid of street, basketball and running styles heavily influenced by 90s subculture, this season\'s out of office sneakers take inspiration from art and textiles. this pair feature a large signature quote. constructed with a calf leather upper and rubber sole.', 490, 9, '42', 'WHITE', '6845a57745589_OMIA189C99LEA012_0110_0.jpg,6845a57745a67_OMIA189C99LEA012_0110_1.jpg,6845a57745d4f_OMIA189C99LEA012_0110_4.jpg,6845a57745fc4_OMIA189C99LEA012_0110_5.jpg,6845a577461f4_OMIA189C99LEA012_0110_6.jpg,6845a5774642c_OMIA189C99LEA012_0110_7.jpg', 'men', 1),
(13, 'Black Fresco Print Outdoor Camera Bag', 'this camera bag is crafted from a fresco-print nylon with cherubs and features leather detailing with a bookish logo. the shoulder strap is woven with bookish logos. made in italy.', 695, 2, 'one size', 'BLACK', '6845a7216ffc3_OMNQ081S25FAB001_1001_0.jpg,6845a7217034c_OMNQ081S25FAB001_1001_1.jpg,6845a72170612_OMNQ081S25FAB001_1001_4.jpg,6845a7217086e_OMNQ081S25FAB001_1001_5.jpg,6845a72170ac1_OMNQ081S25FAB001_1001_6.jpg,6845a72170c93_OMNQ081S25FAB001_1001_7.jpg,6845a72170e8a_OMNQ081S25FAB001_1001_8.jpg', 'men', 3),
(14, 'Black Crocodile Baseball Cap', 'this 100% cotton baseball cap features multiple embroidered logos and a crocodile and has an open back with silver buckle. made in italy.', 350, 8, 'one size', 'BLACK', '6845a7d1c65f4_OMLA049S25FAB007_1055_0.jpg,6845a7d1c6952_OMLA049S25FAB007_1055_1.jpg,6845a7d1c6b32_OMLA049S25FAB007_1055_4.jpg,6845a7d1c6d13_OMLA049S25FAB007_1055_5.jpg,6845a7d1c6ee0_OMLA049S25FAB007_1055_7.jpg', 'men', 4),
(15, 'Bicolor Arrow Chain Ring', 'this 100% brass signet-style ring features an arrow logo and a bicolor gold and silver finish. made in italy.', 225, 6, 'one size', 'SILVER', '6845a9fc923ab_OMOC07GS25MET001_7276_0.jpg,6845a9fc9274e_OMOC07GS25MET001_7276_1.jpg,6845a9fc9295e_OMOC07GS25MET001_7276_5.jpg', 'men', 5),
(16, 'Black/Silver $Ex Belt', 'part of the ss25 \"duty free\" runway collection, this 100% leather belt features a silver buckle with a small bookish logo and additional dollar-shaped and arrow logo hardware. made in italy.', 475, 10, 'one size', 'BLACK', '6845a9ea7ae7e_OMRB14CC99LEA001_1072_0.webp,6845a9ea7b27f_OMRB14CC99LEA001_1072_1.webp,6845a9ea7b5de_OMRB14CC99LEA001_1072_2.webp,6845a9ea7b819_OMRB14CC99LEA001_1072_3.webp,6845a9ea7ba4b_OMRB14CC99LEA001_1072_4.webp,6845a9ea7bd4d_OMRB14CC99LEA001_1072_5.webp', 'exclusive', 4),
(17, 'Fresco Print Straight Jeans Multicolor ', 'these straight-leg jeans are crafted from 100% cotton and feature an all-over fresco print with cherubs and cars. made in italy.', 895, 7, 'xs-s-m-l-xl', 'BLUE', '6845ab58638b9_OMYA18BS25DEN002_8400_0.webp,6845ab3b68209_OMYA18BS25DEN002_8400_1.jpg,6845ab5863c07_OMYA18BS25DEN002_8400_4.jpg,6845ab5863e39_OMYA18BS25DEN002_8400_5.webp,6845ab58640af_OMYA18BS25DEN002_8400_6.webp', 'exclusive', 2),
(18, 'Jitney 1.4 Top Handle Chain', 'black handle jitney chain bag featuring silver arrows at front. silver details.', 1490, 8, 'one size', 'BLACK', '6845ad92da368_OWNP050C99LEA001_1072_0.webp,6845ad92da774_OWNP050C99LEA001_1072_1.webp,6845ad92daa53_OWNP050C99LEA001_1072_4.webp,6845ad92dac81_OWNP050C99LEA001_1072_5.webp,6845ad92dae46_OWNP050C99LEA001_1072_6.webp,6845ad92db00f_OWNP050C99LEA001_1072_7.webp,6845ad92db22e_OWNP050C99LEA001_1072_8.jpg', 'woman', 3),
(19, 'Beige Butterfly Arrow Scarf', 'this 100% silk scarf features large arrow logos intertwined with butterflies and tape measures. made in italy.', 250, 5, 'one size', 'WHITE', '6845af4ab17f4_OWMI001S25FAB001_6158__0.webp,6845af4ab1bfc_OWMI001S25FAB001_6158__1.jpg,6845af4ab1eab_OWMI001S25FAB001_6158__2.jpg,6845af4ab20aa_OWMI001S25FAB001_6158__3.jpg,6845af4ab22b6_OWMI001S25FAB001_6158__4.jpg,6845af4ab2482_OWMI001S25FAB001_6158__5.jpg', 'woman', 4),
(20, 'Bicolor Arrow Pendant Earrings', 'these 100% brass earrings feature large arrow logo studs with matching smaller drops. they come in a bicolor gold and silver pair. made in italy.', 295, 10, 'one size', 'GOLD', '6845afc301d92_OWOD29US25MET001_7672_0.jpg,6845afc30221e_OWOD29US25MET001_7672_1.jpg,6845afc3025f5_OWOD29US25MET001_7672_5.jpg', 'woman', 5),
(21, 'White Stamp Fresco Dress', 'this long-sleeved dress features an all-over fresco-style print and a small stamp logo. made in italy.', 495, 10, 'xs-s-m-l-xl', 'PINK', '6845b0f90b053_OWDB540S25JER002_4201_0.jpg,6845b0f90b6a0_OWDB540S25JER002_4201_1.jpg,6845b0f90bc4e_OWDB540S25JER002_4201_4.jpg,6845b0f90bff2_OWDB540S25JER002_4201_5.jpg,6845b0f90c278_OWDB540S25JER002_4201_6.jpg', 'woman', 2),
(22, 'Vintage Black Meteor Jeans', 'these straight-cut jeans are crafted from 100% cotton with a vintage faded wash. they feature meteor cut-out details. made in italy.', 575, 19, 'xs-s-m-l-xl', 'BLACK', '6845b158a4b12_OWYA06AC99DEN002_1000__0.jpg,6845b158a4f8d_OWYA06AC99DEN002_1000__1.jpg,6845b158a56b9_OWYA06AC99DEN002_1000__4.webp,6845b158a5926_OWYA06AC99DEN002_1000__5.jpg,6845b158a5ba7_OWYA06AC99DEN002_1000__6.jpg,6845b158a5ede_OWYA06AC99DEN002_1000__7.jpg', 'woman', 2),
(23, 'White Allen Mules', 'these 100% leather mules feature signature allen key heels and an embossed arrow logo. made in italy.', 790, 10, '40-41-42-43-44-45', 'BEIGE', '6845b21b055c9_OWIJ04DS25LEA001_0B10_0.webp,6845b21b059f2_OWIJ04DS25LEA001_0B10_1.webp,6845b21b05db9_OWIJ04DS25LEA001_0B10_4.webp,6845b21b05fac_OWIJ04DS25LEA001_0B10_5.webp,6845b21b0616e_OWIJ04DS25LEA001_0B10_6.webp,6845b21b0631e_OWIJ04DS25LEA001_0B10_7.webp', 'woman', 1),
(24, 'Arrow Chain Necklace', 'this 100% brass chain necklace has a shiny gold finish and an arrow logo. made in italy.', 355, 10, 'one size', 'GOLD', '6845b2bbb8eb0_OWOB13HC99MET001_7600__0.jpg,6845b2bbb921c_OWOB13HC99MET001_7600__1.jpg,6845b2bbb9472_OWOB13HC99MET001_7600__2.jpg,6845b2bbb96ce_OWOB13HC99MET001_7600__3.jpg,6845b2bbb98c8_OWOB13HC99MET001_7600__4.jpg,6845b2bbb9a8b_OWOB13HC99MET001_7600__5.jpg', 'woman', 5),
(25, 'Silver/Bronze Be Right Back', 'the be right back sneakers channel performance running aesthetics into an everyday silhouette. crafted from a combination of mesh and synthetic leather, they feature multiple signature brand design elements and dynamic arrow language.', 465, 10, '40-41-42-43-44-45', 'BROWN', '6845b462c4e5d_OWIA289S25FAB003_7221_0.webp,6845b462c51e2_OWIA289S25FAB003_7221_1.jpg,6845b462c54b7_OWIA289S25FAB003_7221_4.webp,6845b462c5702_OWIA289S25FAB003_7221_5.webp,6845b462c591d_OWIA289S25FAB003_7221_6.webp,6845b462c5aed_OWIA289S25FAB003_7221_7.webp', 'exclusive', 1),
(26, 'Silver/Peach Be Right Back', 'the be right back sneakers channel performance running aesthetics into an everyday silhouette. crafted from a combination of mesh and synthetic leather, they feature multiple signature brand design elements and dynamic arrow language.', 465, 12, '40-41-42-43-44-45', 'ORANGE', '6845b4df30a49_OWIA289S25FAB003_7274_0.webp,6845b4df30ebc_OWIA289S25FAB003_7274_1.jpg,6845b4df310f4_OWIA289S25FAB003_7274_4.webp,6845b4df312bc_OWIA289S25FAB003_7274_5.webp,6845b4df31500_OWIA289S25FAB003_7274_6.webp,6845b4df317a2_OWIA289S25FAB003_7274_7.webp', 'exclusive', 1),
(27, 'Silver/Blue Be Right Back', 'the be right back sneakers channel performance running aesthetics into an everyday silhouette. crafted from a combination of mesh and synthetic leather, they feature multiple signature brand design elements and dynamic arrow language.', 465, 20, '40-41-42-43-44-45', 'BLUE', '6845b52a7c558_OWIA289S25FAB003_7245_0.webp,6845b52a7c989_OWIA289S25FAB003_7245_1.webp,6845b52a7cd1a_OWIA289S25FAB003_7245_5.webp,6845b52a7cfaa_OWIA289S25FAB003_7245_6.webp,6845b52a7d190_OWIA289S25FAB003_7245_7.webp', 'exclusive', 1),
(28, 'Fresco Print Den Milit Shirt Multicolor', 'this military-style denim shirt is crafted from 100% cotton and features an all-over fresco print with cherubs and cars. made in italy.', 995, 9, 'xs-s-m-l-xl', 'BLUE', '6845b58444e80_OMYD05HS25DEN003_8400_0.webp,6845b58445307_OMYD05HS25DEN003_8400_1.jpg,6845b5844563d_OMYD05HS25DEN003_8400_4.jpg,6845b58445866_OMYD05HS25DEN003_8400_5.webp,6845b58445a3e_OMYD05HS25DEN003_8400_6.jpg', 'exclusive', 2),
(29, 'Blue Fresco Arrow Baseball Cap', 'this 100% cotton baseball cap features a fresco-style cherub graphic with an oversized arrow logo that extends onto the peak. made in italy.', 295, 10, 'one size', 'BLUE', '6845b66254a2f_OWLA017S25FAB005_4084_0.webp,6845b66254ef3_OWLA017S25FAB005_4084_1.webp,6845b66255265_OWLA017S25FAB005_4084_4.jpg,6845b66255436_OWLA017S25FAB005_4084_5.jpg,6845b6625560a_OWLA017S25FAB005_4084_7.webp', 'exclusive', 4),
(30, 'Bicolor Arrow Pendant Necklace', 'this 100% brass chain necklace has a bicolor gold and silver finish and features an arrow logo pendant. made in italy.', 325, 12, 'one size', 'GOLD', '6845b6dc3e004_OMOB15LS25MET001_7276_0.webp,6845b6dc3e440_OMOB15LS25MET001_7276_1.webp,6845b6dc3e78f_OMOB15LS25MET001_7276_4.webp', 'exclusive', 5),
(31, 'Arrow Chain Necklace', 'this 100% brass chain necklace features a silver finish and an arrow logo. made in italy.', 355, 12, 'one size', 'SILVER', '6845b82854c21_OMOB15DC99MET001_7200_0.webp,6845b8285507f_OMOB15DC99MET001_7200_1.webp,6845b8285546a_OMOB15DC99MET001_7200_4.webp', 'exclusive', 5),
(32, 'Silver Arrow Dubrae Charm', 'a new collection of shoe personalization accessories in collaboration with sneaker lab. this arrow dubrae charm features a silver finish with crystals. made in italy.', 95, 12, 'one size', 'GREY', '6845b88a64559_OMZF001T25MET001_7200_0.webp,6845b88a64a52_OMZF001T25MET001_7200_1.webp,6845b88a64e2a_OMZF001T25MET001_7200_5.webp,6845b88a6504e_OMZF001T25MET001_7200_6.webp,6845b88a65205_OMZF001T25MET001_7200_7.webp', 'men', 4);

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
(1, 'free', 'grtis', 100.00, '2025-06-08', '2025-07-06'),
(2, 'BARBARO99', 'no se 99', 99.00, '2025-06-08', '2025-07-06'),
(3, 'JUST 1', 'JUST 1', 1.00, '2025-06-08', '2025-06-29');

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
(1, 'Nasrallah akrach el kaboussi', 'nasaro@g', '$2y$10$lyHHBqPmOBY9UHfIz5tbteApQs0cGAbgbXxSxQesy.7Sxrnq/1LdG', 'calle cristo de la yedra numero 3 bajo f', '999999999', 0),
(26, 'nasrallah   akrach el kaboussi', 'nasaro@gmail.com', '$2y$10$BXfnCNxCl8VOowDTG5wD/u3ijl3/FWMYj6AsHBm8xaIAWo2vTQm.m', 'c/granada n9 bajo A', '12234444', 0);

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
  ADD KEY `fk_pagos_carrito` (`Id_carrito`);

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
  MODIFY `ID_Carrito` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_Categoría` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `ID_Pago` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_productos` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `ID_Promocion` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE SET NULL;

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
  ADD CONSTRAINT `fk_pagos_carrito` FOREIGN KEY (`Id_carrito`) REFERENCES `carrito` (`ID_Carrito`) ON DELETE SET NULL,
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_prod_cat` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`ID_Categoría`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
