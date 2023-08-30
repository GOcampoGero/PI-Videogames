const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const routerVideogames = require('./routerVideogame')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', routerVideogames)




module.exports = router;
