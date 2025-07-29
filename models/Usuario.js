const db = require('../config/db');

const Usuario = {
    // Crear nuevo usuario
    crear: (datos, callback) => {
        const sql = 'INSERT INTO usuarios SET ?';
        db.query(sql, datos, callback);
    },

    // Buscar usuario por tipoDoc y documento
    buscarPorDocumento: (tipoDoc, documento, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE tipoDoc = ? AND documento = ?';
        db.query(sql, [tipoDoc, documento], callback);
    },

    // Buscar usuario solo por documento (sin tipoDoc)
    buscarPorDocumentoSinTipo: (documento, callback) => {
        const query = 'SELECT * FROM usuarios WHERE documento = ?';
        db.query(query, [documento], callback);
    },

    // Obtener todos los usuarios
    obtenerTodos: (callback) => {
        const sql = 'SELECT * FROM usuarios';
        db.query(sql, callback);
    },

    // Validar código de verificación desde base de datos
    validarCodigoVerificacion: (codigo, rol, callback) => {
        const sql = 'SELECT * FROM CodigosVerificacion WHERE codigo = ? AND rol_destinado = ?';
        db.query(sql, [codigo, rol], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0);
        });
    }
};

module.exports = Usuario;
