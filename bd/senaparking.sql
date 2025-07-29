-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-07-2025 a las 15:22:52
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `senaparking`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigosverificacion`
--

CREATE TABLE `codigosverificacion` (
  `id` int NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `rol_destinado` enum('instructor','vigilante') NOT NULL,
  `creado_por_admin` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `codigosverificacion`
--

INSERT INTO `codigosverificacion` (`id`, `codigo`, `rol_destinado`, `creado_por_admin`) VALUES
(1, 'sena1369', 'instructor', 1),
(2, 'sena2008', 'vigilante', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipoDoc` varchar(10) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `rol` enum('aprendiz','instructor','vigilante') NOT NULL,
  `password` varchar(255) NOT NULL,
  `ficha` varchar(20) DEFAULT NULL,
  `centro` varchar(100) DEFAULT NULL,
  `codigoVerificacion` varchar(50) DEFAULT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `tipoDoc`, `documento`, `correo`, `rol`, `password`, `ficha`, `centro`, `codigoVerificacion`, `creado_en`) VALUES
(1, 'muriel', 'CC', '1015068590', 'muriel1234@gmail.com', 'aprendiz', '$2b$10$57i7XxsD0rDnxHsZDEZzaOpRWd4i2tgJmTN5bvC6T9WTmuuLIEDy.', '2847070', 'cuero', NULL, '2025-06-24 13:31:20'),
(2, 'muriel 2', 'CC', '1015068592', 'muriel1256@gmail.com', 'aprendiz', '$2b$10$pCnKq00wUXJmD8vWhe2Rzuu85ULhmMFFcPaqRMJ9oKs17iElmUVN.', '2847070', 'cuero', NULL, '2025-06-24 15:37:48'),
(3, 'valeria osorio santana', 'CC', '1013341086', 'vale@gmail.com', 'aprendiz', '$2b$10$KzHooDrUe.1lCpmwvXfvH.Ub7iNFsNZQVvn1UpJy/MKv4mhcpsT6a', '2901483', 'cuero', NULL, '2025-06-24 16:49:06'),
(4, 'pedro perez', 'CC', '1021804353', 'pedroP@gmail.com', 'aprendiz', '$2b$10$BouKymL7cWlVYvE640Nne.MyMxvx96m7eqRpo3DSNLGBjma9z0hJW', '2846060', 'cuero', NULL, '2025-07-01 13:21:15'),
(5, 'lucas', 'DNI', '43104560', 'lucasgay@gmail.com', 'aprendiz', '$2b$10$s7b./GY2TSih3HIa18e1humfW0xPoTT34dVNFUvHEM7RX2k.x6Yv6', '2847070', 'cuero', NULL, '2025-07-04 15:03:59'),
(6, 'abigail', 'CC', '69696969', 'abigail@gmail.com', 'aprendiz', '$2b$10$yPp.owB662MofMYS6/IhPOxy4qx1NEk13JYL5arFBL8BEyyPqYheS', '2847070', 'cuero', NULL, '2025-07-04 16:08:05'),
(7, 'becerra', 'CC', '1234567890', 'becerra@gmail.com', 'instructor', '$2b$10$PMlqswfTF5E.78S6J.jUGeDgTXbMOU2L/xI6YzVKFv9i3SQXhMMeG', NULL, 'cuero', '12345', '2025-07-04 16:16:45'),
(8, 'walver', 'CC', '1478523690', 'walver@gmail.com', 'instructor', '$2b$10$MfnrsoGJaB51Z2fOHDENMOLxjOiXnP.0gCGLSXDelmZ/s.7d.bWFW', NULL, 'cuero', 'sena1369', '2025-07-10 15:11:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int NOT NULL,
  `placa` varchar(10) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `tipoVehiculo` enum('automovil','motocicleta','camioneta','bicicleta') NOT NULL,
  `propietario` varchar(100) NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `placa`, `marca`, `modelo`, `color`, `tipoVehiculo`, `propietario`, `creado_en`, `idUsuario`) VALUES
(1, 'FHJ789', 'Toyota', 'Corolla', 'rojo', 'automovil', 'pedro', '2025-06-24 16:09:46', NULL),
(2, 'asd234', 'Toyota', 'Corolla', 'rojo', 'motocicleta', 'val', '2025-06-24 16:50:29', 6),
(3, 'FHZ259', 'PORSHE', 'GT5', 'Blanco', 'automovil', 'lucas', '2025-07-04 15:06:21', 5),
(4, 'XXX696', 'PORSHE', 'GT5', 'Blanco', 'automovil', 'lucas', '2025-07-04 16:05:37', 5),
(5, 'XXX136', 'PORSHE', 'GT5', 'Blanco', 'automovil', 'lucas', '2025-07-04 16:08:35', 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codigosverificacion`
--
ALTER TABLE `codigosverificacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `fk_usuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `codigosverificacion`
--
ALTER TABLE `codigosverificacion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
