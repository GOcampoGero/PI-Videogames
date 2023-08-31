const { Videogame, Genres } = require('../db');

const postGame = async(req, res) => {
    const { name, Description, Plataformas, Imagen, FechaDeLanzaminto, Raiting, Genero} = req.body;
    try {        
        const newGame = await Videogame.create({
                name,
                Description,
                Plataformas,
                Imagen,
                FechaDeLanzaminto,
                Raiting
        });
        Genero.forEach(async (gn) => {
            let generosBd = await Genres.findAll({
                where: {
                    Name: gn
                }
            })
            await newGame.addGenres(generosBd)
        });
        res.status(201).json(newGame)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {postGame}

/*{
  "name": "Gero",
  "Description": "hola este es mi juego de prueba",
  "Plataformas": "PC",
  "Imagen": "notiene",
  "FechaDeLanzaminto": "05-04-2001",
  "Raiting": 8.8,
  "Genero": ["Action"]
}*/