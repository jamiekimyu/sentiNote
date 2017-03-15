'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, Link} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Home from './components/Home'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import JournalInputContainer from './containers/JournalInputContainer'
import SignUp from './components/SignUp'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav className="login">
        {user ? <WhoAmI/> : <Login/> }
        <Link to="/signup">Sign Up!</Link> <br/>
        <Link to="/home">Home</Link>
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>


        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/JournalInput" component={JournalInputContainer} />
        <Route path="/signup" component={SignUp} />

      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
