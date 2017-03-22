import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const GET_USER_TWEETS = 'GET_USER_TWEETS';
const GET_SEARCH_TWEETS = 'GET_SEARCH_TWEETS';
const GET_TOPIC_TWEETS = 'GET_TOPIC_TWEETS';
const GET_USER_HISTORY_TWEETS = 'GET_USER_HISTORY_TWEETS';
/* ------------   ACTION CREATORS     ------------------ */
export const getUserTweetsAction = (userTweets) => ({type: GET_USER_TWEETS, userTweets});
export const getSearchTweetsAction = (searchTweets) => ({type: GET_SEARCH_TWEETS, searchTweets});
export const getTopicTweetsAction = (topicTweets) => ({type: GET_TOPIC_TWEETS, topicTweets});
export const getUserHistoryTweetsAction = (historyTweets) => ({type: GET_USER_HISTORY_TWEETS, historyTweets});
/* ------------       REDUCER     ------------------ */
const initialState = {
	userTweets: [],
	searchTweets: [],
	topicTweets: [],
	historyTweets: []
};

export const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch (action.type){
		case GET_USER_TWEETS:
			newState.userTweets = action.userTweets;
			break;
		case GET_SEARCH_TWEETS:
			newState.searchTweets = action.searchTweets;
			break;
		case GET_TOPIC_TWEETS:
			newState.topicTweets = action.topicTweets;
			break;
		case GET_USER_HISTORY_TWEETS:
			newState.historyTweets = action.historyTweets;
			break;
		default:
			return state;
	}
	return newState;
};
/* ------------       DISPATCHERS     ------------------ */
export const getUserTweets = (screenName) => {
  return dispatch => {
    axios.get(`/api/twitter/user/${screenName}`)
         .then(response => response.data)
         .then((tweetData) => {
           dispatch(getUserTweetsAction(tweetData));
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

export const getUserHistoryTweets = (screenName, pages) => {
  return dispatch => {
    axios.get(`/api/twitter/history/${screenName}/${pages}`)
         .then(response => response.data)
         .then((tweetData) => {
           dispatch(getUserHistoryTweetsAction(tweetData));
         })
				 .catch(err => console.error(err));
  };
};

export default reducer;
