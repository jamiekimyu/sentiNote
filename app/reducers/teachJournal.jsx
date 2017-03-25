import axios from 'axios';
import { browserHistory } from 'react-router'


/* -----------------    ACTIONS     ------------------ */
const ADD_DATA = 'ADD_DATA';
const GET_UPDATED_TEACH_DOC = 'GET_UPDATED_TEACH_DOC';
/* ------------   ACTION CREATORS     ------------------ */
export const addData = (newLesson) => ({type: ADD_DATA, newLesson})
export const teachDocToState = (doc) => ({type: GET_UPDATED_TEACH_DOC, doc})
/* ------------       REDUCER     ------------------ */

const initState = {
	newLesson: {},
	currentTeachDoc: {}
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){
		case ADD_DATA:
			newState.newLesson = action.newLesson
			break;
	
		case GET_UPDATED_TEACH_DOC:
			newState.currentTeachDoc = action.doc
			break;

		default:
			return state;
	}
	return newState;
}
/* ------------       DISPATCHERS     ------------------ */
export const teachEmotion = (sentence, emotion, userID ) => dispatch => {
	axios.post('/api/teachJournal', {sentence, emotion, userID})
	.then( res => {
		return dispatch(addData(res.data))
	})
	.catch( err => console.error(err))
}

export const fetchTeachDoc = (userId) => dispatch => {
	console.log('==========>', userId)
	axios.get('/api/teachJournal/' + userId)
	.then( res => {
		return dispatch(teachDocToState(res.data))
	})
	.catch( err => console.error(err))
}

export default reducer;