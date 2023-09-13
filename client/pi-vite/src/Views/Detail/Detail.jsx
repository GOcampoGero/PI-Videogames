import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVideogameById } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogameById(id))
    }, [dispatch, id])

    const GameById = useSelector((state) => state.idGame)
    console.log(GameById)

    return(
        <div>
            <img src={GameById.image} alt={GameById.name} />
            <h2>{GameById.name}</h2>
            <h2>{GameById.FechaDeLanzamiento}</h2>
            <h2>{GameById.description}</h2>
            <h2>Generos: {GameById.genres?.map((gen) => gen + ' - ')}</h2>
            <h2>Plataformas: {GameById.platform?.map((p) => p + '-')}</h2>
            <h2>{GameById.rating}</h2>
                <div>
                    <Link to={'/home'}>
                        <button>Back</button>
                    </Link>
                </div>
        </div>
    )

}

export default Detail