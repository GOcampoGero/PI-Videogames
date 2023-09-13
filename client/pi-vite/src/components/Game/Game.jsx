import style from './Game.module.css'
import { Link } from 'react-router-dom'

const Game = (props) => {
        return(
            <div className={style.container}>
                <img className={style.image} src={props.image} alt={name} />
                <div className={style.subcard}>
                    <Link to={`/${props.id}`}>
                        <h2>{props.name}</h2>
                    </Link>
                    <h2>{props.genres}</h2>
                </div>
            </div>
        ) 

    }

export default Game;
