const axios = require('axios');
const {Videogame, Genres} = require('../db');
require('dotenv').config();
const {API_KEY_GERO} = process.env

const getGameByid = async(req, res) => {
    const { id } = req.params;
    const busqueda = isNaN(id) ? "db" : "api";

    try {
        if (busqueda === 'api'){
            const {data} = await axios.get(
                `https://api.rawg.io/api/games/${id}?key=${API_KEY_GERO}`)

            if(!data.id) throw new Error ('ID no encontrada')

            const apiGame = {
                id: data.id,
                name: data.name,
                FechaDeLanzamiento: data.released,
                platform: data.platforms.map(platform => platform.platform.name),
                genres: data.genres.map(genre => genre.name),
                rating: data.rating,
                image: data.background_image,
                description: data.description,
                created: false
            }

            return res.status(200).json(apiGame)
            
        } else {
            const bdVideogame = await Videogame.findByPk(id, {
                include: [
                    {
                    model: Genres,
                    attributes: ['Name'],
                    through: {attributes: []},
                    },
                ]
            })

            if(!bdVideogame) throw new Error ('ID no encontrada')
            console.log(bdVideogame)
            const bdGame = {
                id: bdVideogame.id,
                name: bdVideogame.Name,
                FechaDeLanzamiento: bdVideogame.FechaDeLanzamiento,
                platform: bdVideogame.Platforms,
                
                rating: bdVideogame.Rating,
                image: bdVideogame.Image,
                description: bdVideogame.Description
            }
            
            res.status(200).json(bdGame)

        }
    } catch (error) {
        return error.message.includes('ID')
        ? res.status(404).send(error.message)
        : res.status(500).send(error.message)
    }
}

module.exports = {getGameByid}