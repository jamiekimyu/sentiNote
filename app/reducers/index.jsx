import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'


const rootReducer = combineReducers({

  auth: require('./auth').default, 
  entries: require('./entry').default, 
  form: form,
  signup: require('./signup').default,
  songs: require('./song').default

})

export default rootReducer
