const Usuario= require('../models/UsuarioModel')
const bcryptjs= require ('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    // extraer datos del request
    const {email, password} = req.body
    try {
        // buscar al usuario
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }
        
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'El password no es correcto'})
        }
        const payload= {
            usuario:{
                id:usuario.id
            }
        }
        // si todo es correcto firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            // tiempo en segundos
            expiresIn:7200 // 2 horas
        }, (error, token) => {
            if(error) throw error;
            res.json({token})
        })

    } catch(error){
        res.status(500).json({msg:'Hubo un error con la autenticación'})
    }
}

exports.getDatosUsuarioAutenticado = async(req,res) => {
    try {
        // el parámetro select que pongo al final es para decir que campos no quiero
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        res.status(500).json({msg:'Hubo un error con la autenticación'})
    }
}