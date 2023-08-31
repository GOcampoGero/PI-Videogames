const axios = require('axios');
const { Videogame, Genres} = require("../db");
const {API_KEY_GERO} = process.env;
const size = 25;



module.exports = async () => {
    
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
            genres: videogame.genres.map(genre => {return { name: genre.name}})
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

        return [...DbGames, ...ApiGames]
    
    } catch (error) {

        throw new Error({error: error.message})

    }
}