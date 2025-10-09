const express = require('express');
const router = express.Router();

const { verificarToken } = require('../services/authServices');
const tareaController = require('../controllers/tareaController');
const { autorizarRoles } = require('../middleware/rolMiddleware');

router.get('/tareas',verificarToken, tareaController.getTareas);
router.post('/tareas',verificarToken, tareaController.createTarea);
router.delete('/tareas/:id', verificarToken, autorizarRoles('admin'), tareaController.deleteTarea);  

module.exports = router;
/// /api/tareas