const { PrismaClient } = require("@prisma/client"); // Importa el cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient(); // Crea una instancia del cliente para ejecutar consultas
async function obtenerPorEmail(correo) {
  // Ejecuta una consulta para encontrar el usuario por email
  return await prisma.usuario.findUnique({ where: { correo } });
}

async function crearUsuario(usuario) {
  return await prisma.usuario.create({ data: usuario });
}

module.exports = {
  obtenerPorEmail,
  crearUsuario,
};
