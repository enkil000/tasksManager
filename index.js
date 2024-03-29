const express = require('express')
const conectarBD= require('./config/db')
const cors = require ('cors')
// crear el servidor
const app = express()
conectarBD()
// habilitar cors para llamadas entre distintos dominios
app.use(cors())
// habilitar express.json
app.use(express.json({extended:true}))

// puerto de la pp
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
// importar rutas
app.use('/api/usuarios', require('./routes/usuariosRouting'))
app.use('/api/auth', require('./routes/authRouting'))
app.use('/api/proyectos', require('./routes/proyectosRouting'))
app.use('/api/tareas', require('./routes/tareasRouting'))
// definir página principal
app.get('/', (req, res) => {
    res.send('Hola mundo')
})
// e2tuT31E5uOW8q7M
// arrancar la app
app.listen(process.env.PORT, '0.0.0.0');