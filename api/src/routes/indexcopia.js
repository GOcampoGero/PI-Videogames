const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const {getVideogames} = require('../Controllers/GetVideogames');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getVideogames)


