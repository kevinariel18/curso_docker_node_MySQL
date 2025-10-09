const jwt = require("jsonwebtoken");
const blackListRepository = require("../repositories/tokenBlacklistRepository");
const secret_key = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ error: "No se proporciono el token modificado" });

  const revocado = await blackListRepository.esTokenRevocado(token);

  if (revocado) return res.status(401).json({ error: "Token revocado" });

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

module.exports = {
  verifyToken,
};