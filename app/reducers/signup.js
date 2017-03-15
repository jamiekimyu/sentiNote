import axios from 'axios';
import {login, whoami} from './auth'
/* -----------------    ACTIONS     ------------------ */


const SET_SIGNUP_MESSAGE = 'SET_SIGNUP_MESSAGE';

/* ------------   ACTION CREATORS     ------------------ */

export const setSignupMessage = message => ({ type: SET_SIGNUP_MESSAGE, message })


/* ------------       REDUCER     ------------------ */


const initState = "Please create a new account"
export const reducer = (state = initState, action) => {
  var newState = Object.assign({}, state)
  switch (action.type){

    case SET_SIGNUP_MESSAGE:
      return action.message;
    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


export const loadProductsInCat = (category) => dispatch => {
  axios.get(`/api/products/cat/${category}`)
  .then(res => {
    dispatch(selCatProducts(res.data))
  })
  .catch(console.error)
}

export const signup = (username, email, password) =>
  dispatch =>
    axios.post('/api/users', {name:username, email, password})
    .then(() => {
      dispatch(login(email, password))
    })
    .catch((err) => {
      dispatch(setSignupMessage('Invalid email or account with that email already exists'))
    })
    .then(dispatch(whoami()))


export default reducer
