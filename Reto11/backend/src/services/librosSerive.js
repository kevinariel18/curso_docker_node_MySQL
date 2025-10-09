const librosRepository = require("../repository/librosRepository"); // Importa el repositorio

async function listarLibros() {
  // Aquí podrías usar req.user.id si quieres filtrar por usuario
  return await librosRepository.obtenerTodos(); // Llama al repositorio
}

module.exports = { listarLibros }; // Exporta el servicio
