const Usuario= require('../models/UsuarioModel')
const bcryptjs= require ('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async(req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    // extraer email y password
    const {email, password} = req.body
    try
    {
        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({msg:'El mail ya existe en la base de datos'})
        }
        user = new Usuario(req.body)
        // hashear password
        const salt = await bcryptjs.genSalt(4)
        user.password= await bcryptjs.hash(password, salt)
        await user.save()
        // crear y firmar el jwt
        const payload= {
            usuario:{
                id:user.id
            }
        }
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            // tiempo en segundos
            expiresIn:7200 // 2 horas
        }, (error, token) => {
            if(error) throw error;
            res.json({
                msg: 'Usuario registrado correctamente',
                token
            })
        })

        //return res.status(200).json({msg:'Usuario creado correctamente'})
    } catch (error){
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}