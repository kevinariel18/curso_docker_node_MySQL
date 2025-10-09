const tareaRepository = require('../repositories/tareaRepository');

async function getTareas(usuarioId) {
    return await tareaRepository.getTareas(usuarioId);
}   

async function deleteTarea(id) {
    // Lógica para eliminar una tarea por su ID
    return await tareaRepository.deleteTarea(id);
}

async function createTarea(data , usuarioId) {
    return await tareaRepository.createTarea(data, usuarioId);
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};