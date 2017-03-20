import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const GET_TWEETS = 'GET_TWEETS';
const GET_SEARCH_TWEETS = 'GET_SEARCH_TWEETS';
const GET_TOPIC_TWEETS = 'GET_TOPIC_TWEETS';
/* ------------   ACTION CREATORS     ------------------ */
export const getTweetsAction = (tweets) => ({type: GET_TWEETS, tweets});
export const getSearchTweetsAction = (searchTweets) => ({type: GET_SEARCH_TWEETS, searchTweets});
export const getTopicTweetsAction = (topicTweets) => ({type: GET_TOPIC_TWEETS, topicTweets});
/* ------------       REDUCER     ------------------ */
const initialState = {
	tweets: [],
	searchTweets: [],
	topicTweets: []
};

export const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type){
		case GET_TWEETS:
			newState.tweets = action.tweets.slice();
			break;
		case GET_SEARCH_TWEETS:
			newState.searchTweets = action.searchTweets.slice();
			break;
		case GET_TOPIC_TWEETS:
			newState.topicTweets = action.topicTweets.slice();
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

export const getSearchTweets = (term) => {
  return dispatch => {
    axios.get(`/api/twitter/search/${term}`)
         .then(response => response.data)
         .then((searchTweetData) => {
           dispatch(getSearchTweetsAction(searchTweetData));
         })
				 .catch(err => console.error(err));
  };
};

export const getTopicTweets = (topic) => {
  return dispatch => {
    axios.get(`/api/twitter/track/${topic}`)
         .then(response => response.data)
         .then((topicTweetData) => {
           dispatch(getTopicTweetsAction(topicTweetData));
         })
				 .catch(err => console.error(err));
  };
};

export default reducer;
