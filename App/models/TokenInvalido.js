
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiracion: { type: Date, required: true }
});

module.exports = mongoose.model('TokenInvalido', tokenSchema);
