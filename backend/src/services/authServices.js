const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const tokenBlacklistRepository = require("../repositories/tokenBlacklistRepository");
const saltRounds = 10;
async function registrarUsuario(data) {
    const userExiste = await userRepository.obtenerPorEmail(data.email);
    if (userExiste) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await userRepository.crearUser({ ...data, password: hashedPassword, rol : data.rol });

    return user;

}

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const secret_key = jwtSecret;

async function loginUsuario(data) {
    const usuario = await userRepository.obtenerPorEmail(data.email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const passwordCorrecto = await bcrypt.compare(data.password, usuario.password);
    if (!passwordCorrecto) throw new Error("Contraseña incorrecta");

    const payload = { userId: usuario.id, email: usuario.email, rol: usuario.rol };

    //Firmar

    const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

    return token;
}

async function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    
    try {
        // Verificar si el token está revocado
        const esRevocado = await tokenBlacklistRepository.esTokenRevocado(token);
        if (esRevocado) {
            return res.status(401).json({ message: 'Token revocado' });
        }
        
        const decoded = jwt.verify(token, secret_key);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {
    verificarToken,
    registrarUsuario,
    loginUsuario
}