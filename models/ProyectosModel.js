const mongoose = require('mongoose')

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        requires: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Proyecto', ProyectoSchema)