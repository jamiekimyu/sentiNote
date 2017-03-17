import axios from 'axios';
import { browserHistory } from 'react-router'


/* -----------------    ACTIONS     ------------------ */
const ADD_LYRICS = 'ADD_LYRICS';
/* ------------   ACTION CREATORS     ------------------ */
export const addLyrics = (songInfo) => ({type: ADD_LYRICS, songInfo})
/* ------------       REDUCER     ------------------ */

const initState = {
	currentSongLyrics: ''
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){

		case ADD_LYRICS:
			newState.currentSongLyrics = action.songInfo
			break;


		default:
			return state;
	}
	return newState;
}
/* ------------       DISPATCHERS     ------------------ */
export const fetchSong = (song) => dispatch => {
	console.log('ssssong',song)
	axios.post('/api/songs', song)
	.then( res => {
		return dispatch(addLyrics(res.data))
	})
	.catch( err => console.error(err))
}



export default reducer;