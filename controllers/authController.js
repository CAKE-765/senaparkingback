const bcrypt = require('bcryptjs'); // Usamos bcryptjs como en tu entorno original
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

// 📝 Registro
const registrar = (req, res) => {
    const { nombre, tipoDoc, documento, correo, rol, password, ficha, centro, codigoVerificacion } = req.body;

    if (!nombre || !tipoDoc || !documento || !correo || !rol || !password) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }

    if ((rol === 'aprendiz' && (!ficha || !centro)) ||
        (rol === 'instructor' && (!centro || !codigoVerificacion)) ||
        (rol === 'vigilante' && !codigoVerificacion)) {
        return res.status(400).json({ msg: 'Campos obligatorios según el rol' });
    }

    const validarYRegistrar = () => {
        Usuario.buscarPorDocumento(tipoDoc, documento, (err, results) => {
            if (err) return res.status(500).json({ msg: 'Error al verificar usuario' });

            if (results.length > 0) {
                return res.status(409).json({ msg: 'Usuario ya registrado' });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const nuevoUsuario = {
                nombre, tipoDoc, documento, correo, rol,
                password: hashedPassword,
                ficha: ficha || null,
                centro: centro || null,
                codigoVerificacion: codigoVerificacion || null
            };

            Usuario.crear(nuevoUsuario, (err, result) => {
                if (err) return res.status(500).json({ msg: 'Error al registrar' });

                const token = generarToken({ id: result.insertId, rol });
                res.status(201).json({ msg: 'Usuario registrado exitosamente', token });
            });
        });
    };

    if (rol === 'instructor' || rol === 'vigilante') {
        Usuario.validarCodigoVerificacion(codigoVerificacion, rol, (err, valido) => {
            if (err) return res.status(500).json({ msg: 'Error validando código' });
            if (!valido) return res.status(401).json({ msg: 'Código de verificación inválido' });
            validarYRegistrar();
        });
    } else {
        validarYRegistrar();
    }
};

// 🔐 Login
const login = (req, res) => {
    const { tipoDoc, documento, rol, password } = req.body;

    Usuario.buscarPorDocumento(tipoDoc, documento, (err, results) => {
        if (err) return res.status(500).json({ msg: 'Error al buscar usuario' });

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const usuario = results[0];
        if (usuario.rol !== rol) {
            return res.status(401).json({ msg: 'Rol incorrecto' });
        }

        const esValida = bcrypt.compareSync(password, usuario.password);
        if (!esValida) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const token = generarToken(usuario);
        res.json({
            msg: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    });
};

module.exports = {
    registrar,
    login
};
