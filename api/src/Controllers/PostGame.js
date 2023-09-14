const { Videogame, Genres } = require('../db');

const postGame = async(req, res) => {
    const { Name, Description, Platforms, Image, FechaDeLanzamiento, Rating, genres} = req.body;
    try {        
        const newGame = await Videogame.create({
                Name: Name,
                Description: Description,
                Platforms: Platforms,
                Image: Image,
                FechaDeLanzamiento: FechaDeLanzamiento,
                Rating: Rating,
                created: true
        });
        genres.forEach(async (gn) => {
            let GenerosBd = await Genres.findAll({
                where: {
                    Name: gn
                }
            }
            )
            await newGame.addGenres(GenerosBd)
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