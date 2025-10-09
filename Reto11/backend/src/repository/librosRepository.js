const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function obtenerTodos() {
  // Consulta todos los libros registrados en la base de datos
  return await prisma.libro.findMany(); // Devuelve un array de libros
}
module.exports = { obtenerTodos }; // Exporta el repositorio
