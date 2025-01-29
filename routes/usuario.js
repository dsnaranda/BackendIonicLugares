var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();

api.post('/usuario', UsuarioController.saveUsuario); // Registrar usuario
api.post('/login', UsuarioController.loginUsuario); // Iniciar sesión

module.exports = api;