const routerGenre = require('express').Router();
const {getGenres} = require('../Controllers/GetGenres');

routerGenre.get('/', getGenres)

module.exports = routerGenre