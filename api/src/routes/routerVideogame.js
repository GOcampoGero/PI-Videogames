const routerVideogame = require('express').Router();
const {getGameByid} = require('../Controllers/GetGameById');
const getVideogames = require('../Controllers/getVideogames');
const getByName = require('../Controllers/getByName')
const { postGame } = require('../Controllers/PostGame');

routerVideogame.get('/', async (req, res) =>{
    
    const { name } = req.query;
    console.log(name)
    try {
        if(name){
            const GamesName =  await getByName(name)
            return res.status(201).json(GamesName)
        } else {
            const resp = await getVideogames()
            return res.status(200).json(resp) 
        }
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
})

routerVideogame.get('/:id' , getGameByid)
routerVideogame.post('/', postGame)

module.exports = routerVideogame