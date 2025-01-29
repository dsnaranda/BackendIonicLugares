var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ComentarioSchema = schema({
    name: String,
    comentario: String
});

var LugarSchema = schema({
    titulo: String,
    imagen: String,
    comentarios: [ComentarioSchema]
});

module.exports = mongoose.model('Lugar', LugarSchema);