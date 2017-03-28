import axios from 'axios'

const initState = {
  user: {},
  myEntries: []
}

const reducer = (state=initState, action) => {
  var newState = Object.assign({}, state);

  switch(action.type) {

  case AUTHENTICATED:
    newState.user = action.user;
    break

  case LOAD_USER_ENTRIES:
    newState.myEntries = action.entries;
    break;

  default:
    return state

  }
  return newState
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

const LOAD_USER_ENTRIES = 'LOAD_USER_ENTRIES'
export const loaded = entries => ({
  type: LOAD_USER_ENTRIES, entries
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
        return user.id
      })
      .then( user_id => {
        if(user_id){ dispatch(getUserEntries(user_id)) ; history.back() }
      })
      .catch(failed => dispatch(authenticated(null)))

export const getUserEntries = (user_id) =>
  dispatch =>
    axios.get(`/api/entries/${user_id}`)
      .then(response => {
        const entries = response.data;
        dispatch(loaded(entries));
      })
      .catch( error => console.error(error))

export default reducer
