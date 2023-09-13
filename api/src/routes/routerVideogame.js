const routerVideogame = require('express').Router();
const {getGameByid} = require('../Controllers/GetGameById');
const {getVideogames} = require('../Controllers/getVideogames');
const { postGame } = require('../Controllers/PostGame');

routerVideogame.get('/', getVideogames)

routerVideogame.get('/:id' , getGameByid)
routerVideogame.post('/', postGame)

module.exports = routerVideogame