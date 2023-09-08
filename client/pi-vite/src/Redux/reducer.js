const initialState = {
    allVideogames: [],
}

const reducer = (state =  initialState, action ) => {
    switch(action.type){
        case "GET_VIDEOGAMES":
            return {...state, allVideogames: action.payload}
    
        default:
            return {...state}
    }


}

export default reducer