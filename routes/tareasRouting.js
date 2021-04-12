const express = require('express')
const router = express.Router()
const tareasController = require('../controllers/tareasController')
const auth = require('../middleware/authMiddleware')
const { check } = require('express-validator')

// api/proyectos/
router.post('/',
    auth,
    [
        check('nombre', 'El título de la tarea es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea)
router.get('/',
    auth,
    tareasController.getTareas
)
router.put('/:id',
    auth,
    [
        check('nombre', 'El título de la tarea es obligatorio').not().isEmpty()
    ],
    tareasController.updateTarea
    )
router.delete('/:id',
    auth,
    tareasController.deleteTarea
    )
// api/proyectos
module.exports = router