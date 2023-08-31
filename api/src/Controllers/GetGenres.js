const axios = require('axios');
const { Genres } = require("../db");
const {API_KEY_GERO} = process.env

const getGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY_GERO}`)
        const genres = data.results;

        const GenerosBd = genres?.map((gn) => gn.name);

        GenerosBd.forEach( async (gnbd) => {
            await Genres.findOrCreate({
                where: {
                    Name: gnbd
                }
            })
        });
        res.status(200).send('generos cargados en base de datos')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {getGenres}