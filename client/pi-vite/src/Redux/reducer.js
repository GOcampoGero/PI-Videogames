const initialState = {
    allVideogames: [],
    idGame: {},
    filterVideogames: [],
    allGenres: []
}

const reducer = (state =  initialState, action ) => {

    switch(action.type){
        case "GET_VIDEOGAMES":
            return {...state, allVideogames: action.payload, filterVideogames: action.payload}
        
        case "GAME_BY_ID":
            return {...state, idGame: action.payload}

        case "GET_ALL_GENRES":
            return {...state, allGenres: action.payload}

        case "FILTRO_POR_GENERO":
            const filterbyGenre = state.filterVideogames.filter(gen => gen.genres.includes(action.payload))
            if (filterbyGenre.length === 0 && action.payload !== "Allgenres"){
                alert("No se encuentran videogames para el genero seleccionado")
                return {...state, ...state.filterVideogames}
            }
            return {
                ...state, filterVideogames: action.payload === "Allgenres"
                ? [...state.allVideogames]
                : filterbyGenre
            }

        case "FILTRO_POR_CREACION":
            const filterbyCreate = state.filterVideogames.filter(vg => vg.created === (action.payload === "true"))
            console.log(state.filterbyCreate)
            console.log(action.payload)
            return {
                ...state,
                filterVideogames: action.payload === "Allcreated"
                ? [...state.filterVideogames]
                : filterbyCreate
            }
        
        case "FILTRO_ORDEN_RATING": 
            const order_rat_filter = action.payload === "rating"
            ? [...state.filterVideogames.sort((a,b) => b.rating - a.rating)]
            : [...state.filterVideogames.sort((a,b) => a.rating - b.rating)]

            const order_rat_all = action.payload === "rating"
            ? [...state.allVideogames.sort((a,b) => b.rating - a.rating)]
            : [...state.allVideogames.sort((a,b) => a.rating - b.rating)]

            return {...state, filterVideogames: order_rat_filter, allVideogames: order_rat_all}
        
        case "FILTRO_ORDEN_AZ": 
            const orderAZ = action.payload === "az"
            ? [...state.filterVideogames.sort((a,b) => a.Name.localeCompare(b.Name))]
            : [...state.filterVideogames.sort((a,b) => b.Name.localeCompare(a.Name))]

            const orderAZ_all = action.payload === "az"
            ? [...state.allVideogames.sort((a,b) => a.Name.localeCompare(b.Name))]
            : [...state.allVideogames.sort((a,b) => b.Name.localeCompare(a.Name))]
            
            console.log(state.allVideogames);
            return {...state, filterVideogames: orderAZ, allVideogames: orderAZ_all}



        default:
            return {...state}
    }


}

export default reducer