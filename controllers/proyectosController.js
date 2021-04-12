const Proyecto = require('./../models/ProyectosModel')
const {validationResult} = require('express-validator')

exports.crearProyecto = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    try
    {
        // crear proyecto
        const proyecto = new Proyecto(req.body)

        // Guardar creador via JWT
        proyecto.creador= req.usuario.id
        await proyecto.save()
        res.json(proyecto)
    } catch (error){
        res.status(500).send('Hubo un error')
    }

}
exports.getProyectos = async (req, res ) => {
    try{
        const proyectos = await Proyecto.find({creador:req.usuario.id}).sort({creado:-1})
        res.json({proyectos})
    }catch(error){
        res.status(500).send('Ha ocurrido un error')
    }
}

exports.getUltimoProyecto = async (req, res) => {
    try{
        const proyecto = await Proyecto.findOne().sort()
        res.json({proyecto})
    }catch(error){
        res.status(500).send('Ha ocurrido un error')
    } 
}


exports.updateProyecto = async (req, res) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // extraer info del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    if(nombre){
        nuevoProyecto.nombre=nombre
    }

    try {
        const idProyecto = req.params.id
        // revisar id
        let proyecto = await Proyecto.findById(idProyecto)
        // revisar creador
        if(proyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        // actualizar
        proyecto= await Proyecto.findByIdAndUpdate({_id:idProyecto}, {$set : nuevoProyecto}, {new:true})
        res.json({proyecto})

    } catch(error){
        res.status(500).send('Error en el servidor o el proyecto no existe')
    }
}


exports.deleteProyecto = async (req, res) => {
    try {
        const idProyecto = req.params.id
        // revisar id
        let proyecto = await Proyecto.findById(idProyecto)
        // revisar creador
        if(proyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        // actualizar
        proyecto= await Proyecto.findOneAndRemove({_id:idProyecto})
        res.json({msg:'Proyecto eliminado correctamente'})

    } catch(error){
        res.status(500).send('Error en el servidor o el proyecto no existe')
    }
}