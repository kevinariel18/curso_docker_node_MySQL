const jwt = require("jsonwebtoken");
const blackListRepository = require("../repository/blackListRepository");
const secret_key = process.env.JWT_SECRET;

async function validarToken(req, res, next) {
  // extraemos el hedear de la petecion para ver el token
  const header = req.headers["authorization"];
  // verificamos que el header exista
  if (!header) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  // del header que existe extraemos solo el token
  const token = header.split(" ")[1];

  //validamos que el token exista

  if (!token) {
    res.status(401).json({ error: "No existe el token" });
  }

  // aqui se valida si el token no ha sido revocado (Logout)

  const revocado = await blackListRepository.esTokenRevocado(token);

  if (revocado) {
    return res.status(401).json({ error: "Debe volver a iniciar sesión" });
  }

  // validamos que el token que existe sea valido y no haya expirado

  try {
    // Usa la clave secreta para validar la firma del token
    // Si es válido, devuelve el contenido del token (payload)
    const decoded = jwt.verify(token, secret_key);
    // Adjunta el contenido del token (payload) al objeto req
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido o expirado" });
  }
}

module.exports = {
  validarToken,
};
