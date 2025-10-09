const authService = require("../services/authService"); // Importa el servicio que contiene la lógica del registro
const blackListRepository = require("../repository/blackListRepository"); // Importa el servicio que contiene la lógica del registro
//=============================== LOG ING ==========================================
async function logout(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  try {
    await blackListRepository.agregarToken(token);
    res.json({ message: "Logout exitoso" });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
}

//=============================== LOG OUT ==========================================
async function login(req, res) {
  try {
    const token = await authService.login(req.body);
    res.json({ mesage: "login exitoso", token: token });
    console.log("El token es:" + token);
  } catch (error) {
    res.status(500).json({ message: error.mesage });
  }
}

// =========================== Regustro de usuario ===========================
async function registrar(req, res) {
  try {
    const usuario = await authService.registrar(req.body);

    res.json({ message: "Registro de usuario exitoso", usuario: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message + "" + req.body });
  }
}

module.exports = {
  login,
  registrar,
  logout,
};
