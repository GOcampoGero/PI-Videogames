import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import { getVideogames } from "../../Redux/Actions";
import Paginado from '../../components/Paginado/Paginado';
import Games from "../../components/Games/Games"
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.filterVideogames)
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
            <SearchBar setCurrentPage={setCurrentPage}/>
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