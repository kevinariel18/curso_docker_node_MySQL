const { getLibros } = require("../controllers/libroController");
const { validarToken } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/libros", validarToken, getLibros);

module.exports = router;
