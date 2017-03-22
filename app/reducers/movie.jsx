import axios from 'axios';
import { browserHistory } from 'react-router'

/* -----------------    ACTIONS     ------------------ */
const ADD_MOVIE_LINKS_AND_TITLES = 'ADD_MOVIE_LINKS_AND_TITLES';
const ADD_CURRENT_SCRIPT = 'ADD_CURRENT_SCRIPT ';
/* ------------   ACTION CREATORS     ------------------ */
export const addLinksAndTitles = (linksAndTitles) => {   return  ({type: ADD_MOVIE_LINKS_AND_TITLES, linksAndTitles})}
export const addCurrentScript = (script) => {   return  ({type: ADD_CURRENT_SCRIPT , script})}
/* ------------       REDUCER     ------------------ */

const initState = {
	linksAndTitles: [],
	currentMovieScript: ''
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){

		case ADD_MOVIE_LINKS_AND_TITLES :
			newState.linksAndTitles = action.linksAndTitles	
			break;

		case ADD_CURRENT_SCRIPT :
			newState.currentMovieScript = action.script	
			break;


		default:
			return state;
	}
	return newState;
}
/* ------------       DISPATCHERS     ------------------ */
export const fetchMovieLinks = () => dispatch => {
	axios.get('/api/movies/linksAndTitles')
	.then( res => {
		return dispatch(addLinksAndTitles(res.data))
	})
	.catch( err => console.error(err))
}

export const fetchCurrentScript = (scriptLink) => dispatch => {
	axios.post('/api/movies/scripts', {scriptLink})
	.then( res => {
		return dispatch(addCurrentScript(res.data.text))
	})
	.catch( err => console.error(err))
}

export default reducer;