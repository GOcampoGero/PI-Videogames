import axios from 'axios'

export const getVideogames = (name) => {
    return async (dispatch) => {
            let url = 'http://localhost:3001/videogames'
            if (name){
            url += `?name=${name}`
            }
            
            const {data} = await axios.get(url);
            const videogames =  data

            if(videogames.length === 0){
                alert("Videogames not found")
            }   
            return dispatch({type: 'GET_VIDEOGAMES', payload: videogames})
        }
    }

export const getVideogameById = (id) => {
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/videogames/${id}`)
        const game = data
        dispatch({type: 'GAME_BY_ID', payload: game })
    }
}

export const getAllGenres = () => {
    return async function (dispatch) {
        const {data} = await axios.get('http://localhost:3001/genres')
        const genres = data
        dispatch({type: 'GET_ALL_GENRES', payload: genres })
    }
}
export const filtroPorGenero = (genre) => {
    return function (dispatch){
     dispatch ({type: 'FILTRO_POR_GENERO', payload: genre})
    } 
        
}


export const postGame = () => {
    
}


export const filtroPorCreacion = (created) => {
    return function (dispatch){
        dispatch ({type: 'FILTRO_POR_CREACION', payload: created})
       }
}

export const ordenPorRating = (order_rat) => {
    return function (dispatch){
        dispatch ({type: 'FILTRO_ORDEN_RATING', payload: order_rat})
    }
}

export const ordenAZ = (order_az) => {
   return function (dispatch){
    dispatch ({type: 'FILTRO_ORDEN_AZ', payload: order_az})
   }
}

