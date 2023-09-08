import Game from "../Game/Game";
import style from './Games.module.css'

const Games = ({videogames}) => {
    console.log(videogames)
    return (
        <div className={style.div}>
            <div className={style.container}>
            {
                videogames.map((videogame) => {
                    return (
                    <Game
                    key = {videogame.id}
                    id = {videogame.id}
                    name = {videogame.Name}
                    image = {videogame.Image}
                    genres = {videogames.genres}
                    />
                )})
            }
            </div>
        </div>
    )
}

export default Games;