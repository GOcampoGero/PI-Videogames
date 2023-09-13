const axios = require('axios');
const { Genres } = require("../db");
const {API_KEY_GERO} = process.env

const getGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY_GERO}`)
        const apiGenres = data.results.map(genre => ({
            name: genre.name,
            id: genre.id
        }));

        const GenerosBd = await Promise.all(
            apiGenres.map( async genre => {
                const [dbGenres] = await Genres.findOrCreate({
                    where: {id: genre.id},
                    defaults: {
                        Name: genre.name
                    },
                });
                return dbGenres
            }
            ))
        res.status(200).json(GenerosBd)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {getGenres}