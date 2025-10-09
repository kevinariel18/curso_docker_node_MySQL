const express = require("express");
const router = express.Router();
const { validarToken } = require("../middleware/authMiddleware");
const { login, registrar, logout } = require("../controllers/authController");

router.post("/login", login);
router.post("/logout", validarToken, logout);
router.post("/registrar", registrar);

module.exports = router;
