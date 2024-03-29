const mongoose = require('mongoose')

const TareasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        requires: true,
        trim: true
    },
    estado: {
        type:Boolean,
        default:false
    },
    fecha: {
        type:Date,
        default:Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
})
module.exports = mongoose.model('Tarea', TareasSchema)