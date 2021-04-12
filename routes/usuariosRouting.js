// rutas para crear usuarios
const express= require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator')

// api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Añade un email válido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario
)

module.exports = router