const Vehiculo = require('../models/Vehiculo');

// 🚗 Registrar vehículo
const registrarVehiculo = (req, res) => {
    console.log('📥 Intentando registrar vehículo');
    console.log('🧾 Body recibido:', req.body);
    console.log('🔐 Usuario autenticado:', req.usuario);

    const { placa, marca, modelo, color, tipoVehiculo, propietario } = req.body;
    const idUsuario = req.usuario?.id;

    // Validación de autenticación
    if (!idUsuario) {
        return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    // Validación de campos
    if (!placa || !marca || !modelo || !color || !tipoVehiculo || !propietario) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const nuevoVehiculo = {
        placa,
        marca,
        modelo,
        color,
        tipoVehiculo,
        propietario,
        idUsuario
    };

    Vehiculo.registrar(nuevoVehiculo, (err, result) => {
        if (err) {
            console.error('❌ Error en DB al registrar vehículo:', err);
            return res.status(500).json({ msg: 'Error al registrar vehículo' });
        }

        console.log('✅ Vehículo registrado con ID:', result.insertId);
        res.status(201).json({ msg: 'Vehículo registrado correctamente', id: result.insertId });
    });
};

// 🚗 Listar vehículos del usuario
const listarVehiculos = (req, res) => {
    const idUsuario = req.usuario?.id;

    if (!idUsuario) {
        return res.status(401).json({ msg: 'No autorizado' });
    }

    Vehiculo.obtenerPorUsuario(idUsuario, (err, results) => {
        if (err) {
            console.error('❌ Error al obtener vehículos:', err);
            return res.status(500).json({ msg: 'Error al obtener vehículos' });
        }

        res.json(results);
    });
};

module.exports = {
    registrarVehiculo,
    listarVehiculos
};
