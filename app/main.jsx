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
import EditProfileContainer from './containers/EditProfileContainer'
import SignUp from './components/SignUp';
import Twitter from './components/Twitter';
import Entry from './components/Entry';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap';


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
  <div>
  <Navbar default collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a className='margTop8'><Link to="/home">Home</Link></a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} className='margTop8' ><Link to="/journalInput">Journal</Link></NavItem>
        <NavItem eventKey={2} className='margTop8' ><Link to="/twitter">Tweets</Link></NavItem>
        <NavItem eventKey={3} className='margTop8' ><Link to="/SongInput">Songs</Link></NavItem>
        <NavItem eventKey={4} id={user.user ? 'dashBoardText' : ''} className='margTop8' ><Link to={user.user ? '/user' : "/signup"}>{user.user ? <span className='text-danger'>My Dashboard</span> : 'Signup'}</Link></NavItem>
        <NavItem eventKey={5} className='inline right' >{user.user&&<Link to="/user"><img id='dashBoardIcon' className='img img-responsive' src='/dashBoard.png'/></Link>}</NavItem>
      </Nav>

      <Nav pullRight>
        { user.user ? <NavItem eventKey={1} > <WhoAmI/> </NavItem> : <Login/> }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className='abs'>
   {children}
  </div>


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
        <Route path="/editUser" component={EditProfileContainer} />
				<Route path="/twitter" component={Twitter} />
        <Router path={`/entries/:entry_id`} component={Entry} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
