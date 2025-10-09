const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function agregarToken(token) {
  await prisma.tokenRevocado.create({ data: { token: token } });
}

async function esTokenRevocado(token) {
  const existe = await prisma.tokenRevocado.findUnique({ where: { token } });
  return !!existe;
}

module.exports = {
  agregarToken,
  esTokenRevocado
};
