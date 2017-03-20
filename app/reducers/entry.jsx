import axios from 'axios';
import { browserHistory } from 'react-router'

/* -----------------    ACTIONS     ------------------ */
const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';
/* ------------   ACTION CREATORS     ------------------ */
export const addEntryToState = (entry) => ({type: ADD_NEW_ENTRY, entry})
/* ------------       REDUCER     ------------------ */

const initState = {
	newEntry: {}
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){

		case ADD_NEW_ENTRY:
			newState.newEntry = action.entry
			break;


		default:
			return state;
	}
	return newState;
}
/* ------------       DISPATCHERS     ------------------ */
export const addEntry = (entry) => dispatch => {
	axios.post('/api/entries', entry)
	.then( res => {
		return dispatch(addEntryToState(res.data))
	})
	.catch( err => console.error(err))
}



export default reducer;
