import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'


const rootReducer = combineReducers({
  auth: require('./auth').default,
  form: form,
  signup: require('./signup').default
})

export default rootReducer
