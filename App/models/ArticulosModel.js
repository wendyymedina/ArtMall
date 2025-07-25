const mongoose = require('mongoose')
const articulosEschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    }, 
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }/*,
    imagen:{
        type: String,
        required: true
    }*/
})

const articulo = mongoose.model('articulos', articulosEschema)

module.exports = articulo