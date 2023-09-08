import axios from 'axios'

export const getVideogames = (name='') => {
    return async (dispatch) => {
        try {
            const URL = 'http://localhost:3001/videogames'
            if (name){
            URL += `?name=${name}`
            }
            
            const {data} = await axios.get(URL);
            const videogames =  data
            return dispatch({type: 'GET_VIDEOGAMES', payload: videogames})
        } catch (error) {
            if(videogames.length === 0){
                alert("Videogames not found")
            }   
        }
    }
}
