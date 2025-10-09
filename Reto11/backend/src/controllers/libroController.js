const { listarLibros } = require("../services/librosSerive");

async function getLibros(req, res) {
  try {
    // Aquí ya tienes acceso a req.user gracias al middleware, si quisiera comparar por user
    const libros = await listarLibros();
    res.json({ libros });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getLibros,
};
