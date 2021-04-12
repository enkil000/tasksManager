// rutas para autenticar usuarios
const express= require('express');
const router = express.Router();
const {check} = require('express-validator')
const authController = require('./../controllers/authController')
const auth= require('./../middleware/authMiddleware')
// api/auth
router.post('/', 
    [
        check('email', 'Añade un email válido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
)
router.get('/',
    auth,
    authController.getDatosUsuarioAutenticado
)

module.exports = router