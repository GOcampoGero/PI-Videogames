const {API_KEY_GERO} = process.env;
const {Videogame, Genres} = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');

module.exports = async (nameVg) => {
    try {
            const namebusqueda = nameVg.toLowerCase()
            console.log(namebusqueda)
            //busqueda en la BD
            const BD_Names = await Videogame.findAll({
                where: {
                name: {
                        [Op.iLike]: `%${namebusqueda}%`
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
            const videogames = (await axios.get(`https://api.rawg.io/api/games?search=${namebusqueda}&key=${API_KEY_GERO}`)).data.results
            console.log(videogames)
            const API_Names = [...videogames].map( (videogame) => {
                return {
                    id: videogame.id,
                    name: videogame.name,
                    image: videogame.background_image,
                    genres: videogame.genres.map(genre => genre.name)
                }
            });
            const AllGames = [...BD_Names, ...API_Names].slice(0, 15);
            console.log(videogames)
            return AllGames;

        } catch (error) {
        throw new Error({error: error.message})
        }
    }