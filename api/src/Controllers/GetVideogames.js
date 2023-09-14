const axios = require('axios');
const { Videogame, Genres} = require("../db");
const {API_KEY_GERO} = process.env;
const size = 25;



const getVideogames = async (req, res) => {
    const {name} = req.query

    try {
        const page1 = (await axios.get(`https://api.rawg.io/api/games?page_size=${size}&page=1&key=${API_KEY_GERO}`)).data.results;
        const page2 = (await axios.get(`https://api.rawg.io/api/games?page_size=${size}&page=2&key=${API_KEY_GERO}`)).data.results;
        const page3 = (await axios.get(`https://api.rawg.io/api/games?page_size=${size}&page=3&key=${API_KEY_GERO}`)).data.results;
        const page4 = (await axios.get(`https://api.rawg.io/api/games?page_size=${size}&page=4&key=${API_KEY_GERO}`)).data.results;
        
        const ApiGames = [...page1, ...page2, ...page3, ...page4].map( videogame => {
            return{
            id: videogame.id,
            Name: videogame.name,
            Image: videogame.background_image,
            Platforms: videogame.platforms.map(pl => pl.platform.name),
            genres: videogame.genres.map(genre => genre.name),
            rating: videogame.rating,
            created: false
            }
        })

        const DbGames = await Videogame.findAll({
            include: [
                {
                model: Genres,
                attributes: ['Name'],
                through: {attributes: []},
                },
            ]
        })
        
        const allVideogames = [...DbGames, ...ApiGames]

        if (name) {
            const gamesbyName = allVideogames.filter(
                game => game.Name.toLowerCase().includes(name.toLowerCase()))

            return res.status(201).json(gamesbyName.slice(0,15))
        }
        else{
            return res.status(200).json(allVideogames)
        }
    
    } catch (error) {

        return res.status(400).json({error: error.message})

    }
}

module.exports = {getVideogames}