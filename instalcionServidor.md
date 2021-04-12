## API REST node
Inicializar la aplicación para generar el fichero
<code>
    packaje.json
</code>
<br>Script de inicialización:
  
  `npm init`
### Instalar las siguientes dependencias:
  
  `npm -D nodemon - la D es para instalar para desarrollo`
<br>
  
  `npm install dotenv express mongoose bcryptjs`

  **Modificar los script de**
<br> `packaje.json`
  
  `  
  "scripts": {   
      "start": "node .",  
      "dev": "nodemon ."  
      },`
`
  
  `npm run dev (inicia el servidor)`
  
  ### Añadiendo validación: express validator

  `npm install express-validator`    

 ### Añadiendo control usuarios por json web token JWT

  `npm install jsonwebtoken`    






