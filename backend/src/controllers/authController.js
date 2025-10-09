const authServices = require("../services/authServices")
const blacklistRepo = require("../repositories/tokenBlacklistRepository")

async function registrarUsuario(req, res) {
    try {
        const usuario = await authServices.registrarUsuario(req.body);
        res.status(201).json({ message: "Usuario registrado correctamente", data: usuario });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function loginUsuario(req, res) {
    try {
        const token = await authServices.loginUsuario(req.body);
        res.status(200).json({ message: "Usuario logueado correctamente", data: token });

    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function logout(req, res) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: "No se proporciono el token"})
    
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({message: "No se proporciono el token"})

    await blacklistRepo.agregarToken(token);
    res.json({message: "Usuario deslogeado correctamente"})

}

module.exports = {
    registrarUsuario,
    loginUsuario,
    logout
}