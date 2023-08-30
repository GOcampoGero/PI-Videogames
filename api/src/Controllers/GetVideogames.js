const axios = require('axios');
const { Videogame, Genres} = require("../db");
const {API_KEY_GERO} = process.env



const getVideogames = async (req, res) => {
    
    try {
        const dataBaseVideogame = await Videogame.findAll({
            include: [
                {
                model: Genres,
                attributes: ['Name'],
                through: {attributes: []},
                },
            ]
        })

        const dbVG = dataBaseVideogame.map(vg => {
            const genres = vg.genres.map(gen => gen.name)
            return {
                genres: genres,
                id: vg.id,
                name: vg.name,
                platform: vg.platform,
                FechaDeLanzamiento: vg.released,
                raiting: vg.raiting,
                image: vg.image,
                description: vg.description,
                created: vg.created
            }
        })

        const { data } = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY_GERO}&limit=100`))
        const apiVG = await data.results.map( videogame => ({
            id: videogame.id,
            Name: videogame.name,
            Image: videogame.background_image,
            Plataformas: videogame.platforms.map(platform => platform.platform.name),
            FechaDeLanzamiento: videogame.released,
            Raiting: videogame.raiting,
            genres: videogame.genres.map(genre => genre.name)
        }));
        return [...apiVG, ...dbVG]

    
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {getVideogames}