import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import { getVideogames } from "../../Redux/Actions";
import Paginado from '../../components/Paginado/Paginado';
import Games from "../../components/Games/Games"

const Home = () => {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.allVideogames)
    const [currentPage, setCurrentPage] = useState(1);
    const videogamesPerPage = 15;

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    const indexOfLastVideogames = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogames - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogames);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div>
            <Games videogames={currentVideogames}/>
            <Paginado
            currentPage = {currentPage}
            TotalPages = {Math.ceil(videogames.length / videogamesPerPage)}
            onPageChanger = {handlePageChange}
            />
        </div>
    )
}

export default Home;