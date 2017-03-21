import axios from 'axios';
import { browserHistory } from 'react-router'

/* -----------------    ACTIONS     ------------------ */
const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';
const ADD_SELECT_ENTRY = 'SELECT_ENTRY'
/* ------------   ACTION CREATORS     ------------------ */
export const addEntryToState = (entry) => ({type: ADD_NEW_ENTRY, entry})
export const selectEntryToState = (entry) => ({type: ADD_SELECT_ENTRY, entry})
/* ------------       REDUCER     ------------------ */

const initState = {
	newEntry: {},
	selectedEntry: {}
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){

		case ADD_NEW_ENTRY:
			newState.newEntry = action.entry;
			break;

		case ADD_SELECT_ENTRY:
			newState.selectedEntry = action.entry;
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

export const selectEntryById = (entry_id) => dispatch => {
	axios.get(`/api/entries/entry/${entry_id}`)
	.then( res => {
		dispatch(selectEntryToState(res.data))
	})
}


export default reducer;
