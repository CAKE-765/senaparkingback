const express = require('express');
const router = express.Router();
const { obtenerUsuariosConVehiculos, buscarUsuarioConVehiculosPorDocumento } = require('../controllers/Vigilante');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/usuarios-vehiculos', authMiddleware, obtenerUsuariosConVehiculos);

// 🚨 Ruta para buscar usuario por documento
router.get('/buscar/:documento', authMiddleware, buscarUsuarioConVehiculosPorDocumento);



module.exports = router;
