var Lugar = require('../models/lugar');

async function saveLugar(req, res) {
    var lugar = new Lugar();
    var params = req.body;

    if (params.titulo && params.imagen) {
        lugar.titulo = params.titulo;
        lugar.imagen = params.imagen;
        lugar.comentarios = []; 

        try {
            const lugarStored = await lugar.save();
            if (lugarStored) {
                res.status(200).json({
                    lugar: lugarStored
                });
            } else {
                res.status(500).json({
                    message: 'No se pudo guardar el lugar'
                });
            }
        } catch (err) {
            res.status(500).json({
                message: 'Error en el servidor',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'El título y la imagen son obligatorios'
        });
    }
}

async function getLugares(req, res) {
    try {
        const lugares = await Lugar.find();
        res.status(200).json(lugares);
    } catch (err) {
        res.status(500).json({
            message: 'Error al obtener los lugares',
            error: err.message
        });
    }
}

async function getLugar(req, res) {
    var lugarId = req.params.id;

    try {
        const lugar = await Lugar.findById(lugarId);
        if (lugar) {
            res.status(200).json(lugar);
        } else {
            res.status(404).json({
                message: 'Lugar no encontrado'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: err.message
        });
    }
}

async function updateLugar(req, res) {
    var lugarId = req.params.id;
    var update = req.body;

    try {
        const lugarUpdated = await Lugar.findByIdAndUpdate(lugarId, update, { new: true });
        if (lugarUpdated) {
            res.status(200).json(lugarUpdated);
        } else {
            res.status(404).json({
                message: 'Lugar no encontrado para actualizar'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: err.message
        });
    }
}

async function deleteLugar(req, res) {
    var lugarId = req.params.id;

    try {
        const lugarDeleted = await Lugar.findByIdAndDelete(lugarId);
        if (lugarDeleted) {
            res.status(200).json({
                message: 'Lugar eliminado correctamente',
                lugar: lugarDeleted
            });
        } else {
            res.status(404).json({
                message: 'Lugar no encontrado para eliminar'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: err.message
        });
    }
}

async function addComentario(req, res) {
    var lugarId = req.params.id;
    var params = req.body;

    if (params.name && params.comentario) {
        try {
            const lugar = await Lugar.findById(lugarId);
            if (lugar) {
                lugar.comentarios.push({
                    name: params.name,
                    comentario: params.comentario
                });
                const lugarUpdated = await lugar.save();
                res.status(200).json(lugarUpdated);
            } else {
                res.status(404).json({
                    message: 'Lugar no encontrado para agregar comentario'
                });
            }
        } catch (err) {
            res.status(500).json({
                message: 'Error en el servidor',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'El nombre y el comentario son obligatorios'
        });
    }
}

async function deleteComentario(req, res) {
    var lugarId = req.params.id;
    var comentarioIndex = parseInt(req.params.index);

    try {
        const lugar = await Lugar.findById(lugarId);
        if (lugar) {
            if (comentarioIndex >= 0 && comentarioIndex < lugar.comentarios.length) {
                lugar.comentarios.splice(comentarioIndex, 1); 
                const lugarUpdated = await lugar.save();
                res.status(200).json(lugarUpdated);
            } else {
                res.status(400).json({
                    message: 'Índice de comentario inválido'
                });
            }
        } else {
            res.status(404).json({
                message: 'Lugar no encontrado para eliminar comentario'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: err.message
        });
    }
}

module.exports = {
    saveLugar,
    getLugares,
    getLugar,
    updateLugar,
    deleteLugar,
    addComentario,
    deleteComentario
};
