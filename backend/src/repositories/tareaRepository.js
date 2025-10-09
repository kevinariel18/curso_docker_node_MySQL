const { PrismaClient } = require('@prisma/client');   
const prisma = new PrismaClient(); 

async function getTareas(usuarioId) {
    return await prisma.tarea.findMany({
        where: {
            usuarioId: usuarioId 
        }
    });
}
async function deleteTarea(id, usuarioId) {
    return await prisma.tarea.delete({
        where: {
            id: parseInt(id),
            usuarioId: usuarioId
        }
    });
}

async function createTarea(data, usuarioId) {
    return await prisma.tarea.create({data: { ...data, usuarioId}});
}


module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};
