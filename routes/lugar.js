var express = require('express');
var LugaresController = require('../controllers/lugar');

var api = express.Router();

api.post('/lugar', LugaresController.saveLugar); 
api.get('/lugares', LugaresController.getLugares); 
api.get('/lugar/:id', LugaresController.getLugar); 
api.put('/lugar/:id', LugaresController.updateLugar); 
api.delete('/lugar/:id', LugaresController.deleteLugar);
api.post('/lugar/:id/comentarios', LugaresController.addComentario); 
api.delete('/lugar/:id/comentarios/:index', LugaresController.deleteComentario); 

module.exports = api;