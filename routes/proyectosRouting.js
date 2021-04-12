const express = require('express')
const router = express.Router()
const proyectoController = require('./../controllers/proyectosController')
const auth= require('./../middleware/authMiddleware')
const {check} = require('express-validator')

// api/proyectos/
router.post('/', 
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)
router.get('/', 
    auth,
    proyectoController.getProyectos
)
router.get('/last', 
    auth,
    proyectoController.getUltimoProyecto
)
router.put('/:id', 
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.updateProyecto
)
router.delete('/:id', 
    auth,
    proyectoController.deleteProyecto
)
// api/proyectos
module.exports = router