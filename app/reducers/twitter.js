import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const GET_TWEETS = 'GET_TWEETS';
/* ------------   ACTION CREATORS     ------------------ */
export const getTweetsAction = (tweets) => ({type: GET_TWEETS, tweets});

/* ------------       REDUCER     ------------------ */
const initialState = {
	tweets: []
}

export const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type){
		case GET_TWEETS:
			newState.tweets = action.tweets;
			break;
		default:
			return state;
	}
	return newState;
};
/* ------------       DISPATCHERS     ------------------ */
export const getTweets = (screenName) => {
  return dispatch => {
    axios.get(`/api/twitter/user/${screenName}`)
         .then(response => response.data)
         .then((tweetData) => {
           dispatch(getTweetsAction(tweetData));
         })
				 .catch(err => console.error(err));
  };
};

export default reducer;
