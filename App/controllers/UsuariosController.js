const usuarioModel = require('../models/UsuariosModel');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
function buscarTodosUsuarios(req, res) {
    usuarioModel.find({})
        .then(usuarios => {
            if (usuarios.length) {
                return res.status(200).send({ usuarios });
            }
            return res.status(204).send({ mensaje: "No hay información que mostrar" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar la información: ${e}` });
        });
}

// Guardar un nuevo usuario con password encriptada
async function guardarUsuario(req, res) {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password || !rol) {
            return res.status(400).send({ mensaje: "Faltan datos obligatorios" });
        }

        // Encriptar password
        const passwordHasheada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new usuarioModel({
            nombre,
            email,
            password: passwordHasheada,
            rol
        });

        const info = await nuevoUsuario.save();
        return res.status(200).send({ mensaje: "Usuario guardado con éxito", info });

    } catch (e) {
        return res.status(500).send({ mensaje: "Error al guardar el usuario", error: e });
    }
}

// Middleware para buscar un usuario
function buscarUsuario(req, res, next) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    usuarioModel.find(consulta)
        .then(info => {
            if (!info.length) return next();
            req.usuarios = info;
            return next();
        })
        .catch(e => {
            req.error = e;
            return next();
        });
}

// Mostrar usuario encontrado
function mostrarUsuario(req, res) {
    if (req.error) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: req.error
        });
    }

    if (!req.usuarios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ usuarios: req.usuarios });
}

// Eliminar usuario(s)
function eliminarUsuario(req, res) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    usuarioModel.deleteMany(consulta)
        .then(resultado => {
            if (resultado.deletedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún usuario para eliminar" });
            }
            return res.status(200).send({
                mensaje: `${resultado.deletedCount} usuario(s) eliminado(s) con éxito`
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al eliminar usuario", error });
        });
}

// Actualizar usuario(s)
function actualizarUsuario(req, res) {
    const filtro = {};
    filtro[req.params.key] = req.params.value;

    const nuevosDatos = req.body;

    usuarioModel.updateMany(filtro, nuevosDatos)
        .then(resultado => {
            if (resultado.matchedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún usuario para actualizar" });
            }

            return res.status(200).send({
                mensaje: `${resultado.modifiedCount} usuario(s) actualizado(s) con éxito`,
                resultado
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al actualizar usuario", error });
        });
}

module.exports = {
    buscarTodosUsuarios,
    guardarUsuario,
    buscarUsuario,
    mostrarUsuario,
    eliminarUsuario,
    actualizarUsuario
};
