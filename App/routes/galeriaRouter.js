const express = require('express')
const router = express.Router()
const ArticulosController = require('../controllers/ArticulosController')
const UsuariosController = require("../controllers/UsuariosController")
const { verificarToken, esAdmin } = require('../middlewares/authMiddleware')

// Ruta de login (pública)
router.post('/login', UsuariosController.login);


//logout
router.post('/logout', verificarToken, UsuariosController.logout);


//Usuarios
router.get(
    '/usuarios', 
    verificarToken,
    esAdmin,
    UsuariosController.buscarTodosUsuarios
)
.post(
    '/usuarios', UsuariosController.guardarUsuario
)
.get(
    '/usuarios/:key/:value',
    verificarToken,
    esAdmin,
    UsuariosController.buscarUsuario,
    UsuariosController.mostrarUsuario
)
.delete(
    '/usuarios/:key/:value',
    verificarToken,
    esAdmin,
    UsuariosController.buscarUsuario,
    UsuariosController.eliminarUsuario
)
.put(
    '/usuarios/:key/:value',
    verificarToken,
    esAdmin,
    UsuariosController.buscarUsuario,
    UsuariosController.actualizarUsuario
);


//Articulos
router.get(
    '/articulos',
    verificarToken,
    esAdmin,
    ArticulosController.buscarTodo
)
.post(
    '/articulos',
    verificarToken,
    esAdmin,
    ArticulosController.guardarArticulo
)
.get(
    '/articulos/:key/:value',
    verificarToken,
    esAdmin,
    ArticulosController.buscarArticulo,
    ArticulosController.mostrarArticulo
)
.delete(
    '/articulos/:key/:value',
    verificarToken,
    esAdmin,
    ArticulosController.buscarArticulo,
    ArticulosController.eliminarArticulo
)
.put(
    '/articulos/:key/:value',
    verificarToken,
    esAdmin,
    ArticulosController.buscarArticulo,
    ArticulosController.actualizarArticulo
);

module.exports = router;
