const {API_KEY_GERO} = process.env;
const {Videogame, Genres} = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');

const getByName = async (req, res) => {
    const {name} = req.query

    try {
        //busqueda en la BD
        const BD_Names = await Videogame.findAll({
            where: {
                Nombre: {
                    [Op.iLike]: '%name%'
                }
            },
            include: [
                {
                model: Genres,
                attributes: ['Name'],
                through: {attributes: []},
                },
            ]
        })

        //busqueda en la Api
        const { data } = (await axios.get(`https://api.rawg.io/api/games?search=${name}&${API_KEY_GERO}`)).data.results
        const API_Names = await data.results.map( videogame => ({
            id: videogame.id,
            Name: videogame.name,
            Image: videogame.background_image,
            Plataformas: videogame.platforms.map(platform => platform.platform.name),
            FechaDeLanzamiento: videogame.released,
            Raiting: videogame.raiting,
            genres: videogame.genres.map(genre => genre.name)
        }));

        const GamesByName = [...BD_Names, ...API_Names]

        if (GamesByName.length === 0){
            throw new Error ('Juego no encontrado')
        }
        if (GamesByName.length > 15) {
            const GamesByNameLimit = GamesByName.splice(0, 15);
            return res.status(200).json(GamesByNameLimit)
        }
        res.status(200).json(GamesByName)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {getByName}
