var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/lugaresDB')
    .then(() => {
        console.log('Conexión exitosa');
        app.listen(port, () => {
            console.log('Servidor corriendo en el puerto 3800');
        });
    })
    .catch(err => console.log(err));
