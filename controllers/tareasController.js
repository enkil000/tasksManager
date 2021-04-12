const Tarea = require('../models/TareasModel')
const Proyecto = require('../models/ProyectosModel')
const {validationResult} = require('express-validator')

exports.crearTarea = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    try
    {
        const {proyecto} = req.body

        // buscar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        
        if(!existeProyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        // revisar creador
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }

        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json(
            {
                "mensaje":"todo ha ido bien",
                tarea
            }
        )

    } catch (error){
        res.status(500).json({msg:error})
    }

}
exports.getTareas = async (req, res ) => {
    try{
        const {proyecto} = req.query
        // buscar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        
        if(!existeProyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        // revisar creador
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }

        // tareas por proyecto
        const tareas = await Tarea.find({proyecto})
        console.log(tareas)
        res.json({tareas})

    }catch(error){
        console.log(error)
        res.status(500).send('Ha ocurrido un error')
    }
}

exports.updateTarea = async (req, res) => {

    try {
        const idTarea = req.params.id

        const {proyecto, nombre, estado} = req.body
        // buscar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)

        const tareaExiste = await Tarea.findById(idTarea)
        if(!tareaExiste){
            return res.status(404).json({msg:'La tarea no existe'})
        }
        // revisar creador
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        
        const nuevaTarea={}
        if(nombre){
            nuevaTarea.nombre=nombre
        }
        if(estado){
            nuevaTarea.estado=estado
        }
       
        // actualizar
        tarea= await Tarea.findByIdAndUpdate({_id:req.params.id}, {$set: nuevaTarea}, {new:true})
        res.json({tarea})

    } catch(error){
        res.status(500).send('Error en el servidor la tarea no existe')
    }
}


exports.deleteTarea = async (req, res) => {
    try {
        const idTarea = req.params.id

        let tareaExiste = await Tarea.findById(idTarea)
        if(!tareaExiste){
            return res.status(404).json({msg:"No existe la tarea"})
        }
        // actualizar
        tarea= await Tarea.findOneAndRemove({_id:idTarea})
        res.json({msg:'Tarea eliminada correctamente'})

    } catch(error){
        res.status(500).send('Error en el servidor o la tarea no existe')
    }
}