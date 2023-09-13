import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {filtroPorCreacion, filtroPorGenero, getAllGenres, getVideogames, ordenAZ, ordenPorRating} from "../../Redux/Actions"

const SearchBar = ({setCurrentPage}) =>{
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])

    const genres = useSelector((state) => state.allGenres)

    
    const handleReset = () => {
        dispatch(getVideogames());
        setSearch("")
        document.getElementById("Alfabetic").value = "none";
        document.getElementById("Rating").value = "none";
        document.getElementById("Origin").value = "none";
        document.getElementById("Genre").value = "none";
    }

    const handleSearch = () => {
        dispatch(getVideogames(search))
        .then(() => {
            setCurrentPage(1)
        })
    }

    const handleFiltroGenero = (event) => {
        dispatch(filtroPorGenero(event.target.value));
        setCurrentPage(1)
    }

    const handleFiltroPorCreacion = (event) => {
        dispatch(filtroPorCreacion(event.target.value));
        setCurrentPage(1)
    }

    const handleOrdenPorRating = (event) => {
        dispatch(ordenPorRating(event.target.value));
        setCurrentPage(1)
    }

    const handleOrdenAZ = (event) => {
        dispatch(ordenAZ(event.target.value));
        setCurrentPage(1)
    }

    return (
        <div>
           <input 
           type='text' 
           placeholder='busqueda por nombre' 
           value={search} 
           onChange={(event) => setSearch(event.target.value)}/> 
           <button onClick={handleSearch}>Buscar</button>

           <select onChange={handleFiltroGenero} id="Genre">
            <option value="none">---Select Genre---</option>
            <option value="Allgenres">- All Genres -</option>
            {
                genres.map(gen => (
                    <option key={gen.id} value={gen.Name}>{gen.Name}</option>
                ))
            }
           </select>

           <select onChange={handleFiltroPorCreacion} id="Origin">
            <option value="none">---Select Origin---</option>
            <option value="Allcreated">- All Origin -</option>
            <option value="true">User</option>
            <option value="false">Server</option>
           </select>

           <select onChange={handleOrdenPorRating} id="Rating">
            <option value="none">---Order Rating---</option>
            <option value="rating">Ascendent</option>
            <option value="desrat">Descendent</option>
           </select>

           <select onChange={handleOrdenAZ} id="Alfabetic">
            <option value="none">--- Order A-Z ---</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
           </select>

           <button onClick={handleReset}>RESET</button>
        </div>
     );
}

export default SearchBar;