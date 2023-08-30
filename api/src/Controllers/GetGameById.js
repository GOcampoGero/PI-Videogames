const axios = require('axios');
const {Videogame, Genres} = require('../db');
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
                raiting: data.raiting,
                image: data.image,
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

            const bdGame = {
                id: bdGame.id,
                name: bdGame.name,
                FechaDeLanzamiento: bdGame.released,
                platform: bdGame.platforms.map(platform => platform.platform.name),
                genres: bdGame.genres.map(genre => genre.name),
                raiting: bdGame.raiting,
                image: bdGame.image,
                description: bdGame.description,
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