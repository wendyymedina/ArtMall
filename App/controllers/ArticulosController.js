const articuloModel = require('../models/ArticulosModel');

// Obtener todos los articulos
function buscarTodo(req, res) {
    articuloModel.find({})
        .then(articulos => {
            if (articulos.length) {
                return res.status(200).send({ articulos });
            }
            return res.status(204).send({ mensaje: "No hay información que mostrar" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar la información: ${e}` });
        });
}

// Guardar un nuevo articulo
function guardarArticulo(req, res) {
    console.log(req.body);
    new articuloModel(req.body).save()
        .then(info => {
            return res.status(200).send({ mensaje: "Información guardada con éxito", info });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al guardar la información", error: e });
        });
}

// Middleware para buscar un articulo
function buscarArticulo(req, res, next) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    articuloModel.find(consulta)
        .then(info => {
            if (!info.length) return next();
            req.articulos = info;
            return next();
        })
        .catch(e => {
            req.error = e;
            return next();
        });
}

// Mostrar articulo encontrado
function mostrarArticulo(req, res) {
    if (req.error) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: req.error
        });
    }

    if (!req.articulos) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ articulos: req.articulos });
}

// Eliminar articulo(s)
function eliminarArticulo(req, res) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    articuloModel.deleteMany(consulta)
        .then(resultado => {
            if (resultado.deletedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún articulo para eliminar" });
            }
            return res.status(200).send({
                mensaje: `${resultado.deletedCount} articulo(s) eliminado(s) con éxito`
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al eliminar articulo", error });
        });
}

// Actualizar articulo(s)
function actualizarArticulo(req, res) {
    const filtro = {};
    filtro[req.params.key] = req.params.value;

    const nuevosDatos = req.body;

    articuloModel.updateMany(filtro, nuevosDatos)
        .then(resultado => {
            if (resultado.matchedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún articulo para actualizar" });
            }

            return res.status(200).send({
                mensaje: `${resultado.modifiedCount} articulo(s) actualizado(s) con éxito`,
                resultado
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al actualizar articulo", error });
        });
}

module.exports = {
    buscarTodo,
    guardarArticulo,
    buscarArticulo,
    mostrarArticulo,
    eliminarArticulo,
    actualizarArticulo
};
