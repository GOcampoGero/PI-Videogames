const routerVideogames = require('express').Router();
const {getVideogames} = require('../Controllers/GetVideogames');
const {getByName} = require('../Controllers/GetByName')
const {getGameByid} = require('../Controllers/GetGameById')

routerVideogames.get('/', getVideogames)
routerVideogames.get('/', getByName)
routerVideogames.get('/:id' , getGameByid)

module.exports = routerVideogames