'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import JournalInputContainer from './containers/JournalInputContainer'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav> 
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/JournalInput"  component={JournalInputContainer} />
        <Route path="/JournalInput" component={JournalInputContainer} />

      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)