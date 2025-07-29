const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registrar', authMiddleware, vehiculoController.registrarVehiculo);
router.get('/listar', authMiddleware, vehiculoController.listarVehiculos);

module.exports = router;