const express = require('express')
const router = express.Router()
const ArticulosController = require('../controllers/ArticulosController')

router.get('/articulos', ArticulosController.buscarTodo)
.post('/articulos', ArticulosController.guardarArticulo)
.get('/articulos/:key/:value', ArticulosController.buscarArticulo, ArticulosController.mostrarArticulo)
.delete('/articulos/:key/:value', ArticulosController.buscarArticulo, ArticulosController.eliminarArticulo)
.put('/articulos/:key/:value', ArticulosController.buscarArticulo, ArticulosController.actualizarArticulo)

module.exports=router
