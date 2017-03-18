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
import SongInputContainer from './containers/SongInputContainer'
import UserProfileContainer from './containers/UserProfileContainer'
import SignUp from './components/SignUp';
import Twitter from './components/Twitter';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap';


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
  <div>
  <Navbar default collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a ><Link to="/home">Home</Link></a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} ><Link to="/journalInput">Journal</Link></NavItem>
        <NavItem eventKey={2} ><Link to="/twitter">Tweets</Link></NavItem>
        <NavItem eventKey={3} ><Link to="/SongInput">Songs</Link></NavItem>
      </Nav>
      <Nav pullRight>
        { user.user ? <NavItem eventKey={1} > <WhoAmI/> </NavItem> : <Login/> }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
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
        <Route path="/SongInput" component={SongInputContainer} />
        <Route path="/signup" component={SignUp} />
        <Route path="/user" component={UserProfileContainer} />
				<Route path="/twitter" component={Twitter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
