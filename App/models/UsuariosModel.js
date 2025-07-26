const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: { 
        type: String, enum: ['cliente', 'admin'], 
        default: 'cliente' 
    }
});

const usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = usuario
