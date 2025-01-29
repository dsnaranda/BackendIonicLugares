var Usuario = require('../models/usuario');

async function saveUsuario(req, res) {
    var usuario = new Usuario();
    var params = req.body;

    if (params.nombre && params.correo && params.password) {
        usuario.nombre = params.nombre;
        usuario.correo = params.correo;
        usuario.password = params.password;

        try {
            const usuarioStored = await usuario.save();
            res.status(200).json({
                usuario: usuarioStored
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error en el servidor',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'El nombre, correo y contraseña son obligatorios'
        });
    }
}

async function loginUsuario(req, res) {
    var params = req.body;

    if (params.correo && params.password) {
        try {
            const usuario = await Usuario.findOne({ correo: params.correo });

            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }

            if (usuario.password !== params.password) {
                return res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }

            res.status(200).json({
                message: 'Login exitoso',
                usuario
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error en el servidor',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Correo y contraseña son obligatorios'
        });
    }
}

module.exports = {
    saveUsuario,
    loginUsuario
};
