const jwt = require('jsonwebtoken');
const TokenInvalido = require('../models/TokenInvalido'); // Asegúrate de que esta ruta sea correcta
const SECRET_KEY = "mi_secreto_super_seguro";

// Middleware para verificar el token
async function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ mensaje: "Token no proporcionado" });

    const tokenLimpio = token.replace("Bearer ", "");

    try {
        // Revisar si el token está en la blacklist
        const enListaNegra = await TokenInvalido.findOne({ token: tokenLimpio });
        if (enListaNegra) {
            return res.status(401).send({ mensaje: "Token inválido (sesión cerrada)" });
        }

        // Verificar firma y expiración del token
        const decoded = jwt.verify(tokenLimpio, SECRET_KEY);
        req.usuario = decoded; // Guardamos los datos del usuario en la petición
        next();
    } catch (error) {
        return res.status(401).send({ mensaje: "Token inválido o expirado", error });
    }
}

// Middleware para verificar si el usuario es administrador
function esAdmin(req, res, next) {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).send({ mensaje: "Acceso denegado. Solo administradores." });
    }
    next();
}

module.exports = { verificarToken, esAdmin };
