const tareaService = require('../services/tareaService');

async function getTareas(req, res) {

try {
    const usuarioId = req.usuario.userId;
    const tareas = await tareaService.getTareas(usuarioId);
    console.log(tareas);
    res.status(200).json({message: 'Tareas obtenidas', data: tareas});
    }       
    catch (error) {
        
        res.status(500).json({ message: error.message });
    }

}


async function deleteTarea(req, res) {
    try{
        // El middleware ya verificó el token y el rol de admin
        const usuarioId = req.usuario.userId;
        const tareaId = req.params.id;
        const tarea = await tareaService.deleteTarea(tareaId, usuarioId);
        res.status(200).json({message: 'Tarea eliminada', data: tarea});
    } 
    catch(error){  
        res.status(500).json({message: error.message});
    }
}

async function createTarea(req, res) {
    try{
        // Verificar token obligatoriamente
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({message: 'Token requerido'});
        }
        
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Token requerido'});
        }
        
        // Verificar token JWT
        const jwt = require('jsonwebtoken');
        const jwtSecret = process.env.JWT_SECRET;
        
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const usuarioId = decoded.userId;
            
            // Crear tarea con el usuario autenticado
            const tarea = await tareaService.createTarea(req.body, usuarioId);
            res.status(201).json({message: 'Tarea creada', data: tarea});
            
        } catch (tokenError) {
            return res.status(401).json({message: 'Token inválido'});
        }
    }
    catch(error){  
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};