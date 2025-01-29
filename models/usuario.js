var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UsuarioSchema = schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
