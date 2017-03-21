import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';


const rootReducer = combineReducers({

  auth: require('./auth').default,
  entries: require('./entry').default,
  form: form,
  signup: require('./signup').default,
  twitter: require('./twitter').default,
  songs: require('./song').default,
  movies: require('./movie').default
});

  


export default rootReducer;
