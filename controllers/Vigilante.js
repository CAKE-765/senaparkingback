const Usuario = require('../models/Usuario');
const Vehiculo = require('../models/Vehiculo');

// Obtener todos los usuarios con sus vehículos
const obtenerUsuariosConVehiculos = (req, res) => {
    Usuario.obtenerTodos((err, usuarios) => {
        if (err) return res.status(500).json({ msg: 'Error al obtener usuarios' });

        const tareas = usuarios.map((usuario) => {
            return new Promise((resolve) => {
                Vehiculo.obtenerPorUsuario(usuario.id, (err, vehiculos) => {
                    resolve({
                        ...usuario,
                        vehiculos: vehiculos || []
                    });
                });
            });
        });

        Promise.all(tareas).then((usuariosConVehiculos) => {
            res.json(usuariosConVehiculos);
        });
    });
};

// Buscar usuario por documento y traer sus vehículos
const buscarUsuarioConVehiculosPorDocumento = (req, res) => {
    const documento = req.params.documento;

    Usuario.buscarPorDocumentoSinTipo(documento, (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        Vehiculo.obtenerPorUsuario(usuario.id, (err, vehiculos) => {
            if (err) return res.status(500).json({ msg: 'Error obteniendo vehículos' });

            res.json({
                ...usuario,
                vehiculos: vehiculos || []
            });
        });
    });
};

module.exports = {
    obtenerUsuariosConVehiculos,
    buscarUsuarioConVehiculosPorDocumento
};
