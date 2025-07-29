const db = require('../config/db');

const Vehiculo = {
    // Crear vehículo pasando un objeto completo
    crear: (datos, callback) => {
        const sql = 'INSERT INTO vehiculos SET ?';
        db.query(sql, datos, callback);
    },

    // Registrar vehículo de forma detallada
    registrar: (vehiculo, callback) => {
        const { placa, marca, modelo, color, tipoVehiculo, idUsuario } = vehiculo;
        const query = `
            INSERT INTO vehiculos (placa, marca, modelo, color, tipoVehiculo, idUsuario)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [placa, marca, modelo, color, tipoVehiculo, idUsuario], callback);
    },

    // Obtener vehículos de un usuario específico
    obtenerPorUsuario: (idUsuario, callback) => {
        const query = `
            SELECT v.placa, v.marca, v.modelo, v.color, v.tipoVehiculo
            FROM vehiculos v
            WHERE v.idUsuario = ?
        `;
        db.query(query, [idUsuario], callback);
    },

    // Obtener todos los vehículos registrados
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM vehiculos', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

// ...existing code...
Vehiculo.registrar = (data, callback) => {
    const sql = 'INSERT INTO vehiculos (placa, marca, modelo, color, tipoVehiculo, propietario, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
        data.placa,
        data.marca,
        data.modelo,
        data.color,
        data.tipoVehiculo,
        data.propietario,
        data.idUsuario
    ];
    db.query(sql, values, callback);
};
// ...existing code...

module.exports = Vehiculo;
