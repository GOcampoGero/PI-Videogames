import style from './Game.module.css'
const Game = (props) => {
        return(
            <div className={style.container}>
                <img className={style.image} src={props.image} alt={name} />
                <div className={style.subcard}>
                    <h2>{props.name}</h2>
                </div>
              
            </div>
        ) 

    }

export default Game;
