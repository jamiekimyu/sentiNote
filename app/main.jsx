'use strict'
import axios from 'axios';
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
import Twitter from './components/Twitter';
import UserHistoryTweets from './components/UserHistoryTweets';
import EntryContainer from './containers/EntryContainer';
import MovieInputContainer from './containers/MovieInputContainer';
import ModalContainer from './containers/ModalContainer'
import ModalSignUpContainer from './containers/ModalSignUpContainer'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap';
import {fetchTeachDoc, fetchAllTeachDocs} from './reducers/teachJournal'
import {whoami} from './reducers/auth'
import {fetchMovieLinks} from './reducers/movie';
import { selectEntryById } from './reducers/entry';


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
          <NavItem eventKey={4} className='margTop8' ><Link to="/movies">Movies</Link></NavItem>
          {user.user&&(<NavItem eventKey={5} id='dashBoardText' className='margTop8' ><Link to='/user'><span className='text-danger'>My Dashboard</span></Link></NavItem>)}
          {user.user&&(<NavItem eventKey={6} className='inline right' ><Link to="/user"><img id='dashBoardIcon' className='img img-responsive' src='/dashBoard.png'/></Link></NavItem> )}
        </Nav>

        <Nav pullRight>
          { !user.user&&(<NavItem className='margTop8' eventKey={7}><Link className='floatLeft' to='/showModal'><p id='showModal'>Login</p> </Link></NavItem>)  }
          { !user.user ? <NavItem className='margTop8' eventKey={8}><Link className='floatLeft' to='/showModalSignUp'><p id='showModal'>Sign Up</p> </Link></NavItem> : <WhoAmI/>  }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className='abs'>
     {children}
    </div>
  </div>

)

const onMovieEnter = () => {
  store.dispatch(fetchAllTeachDocs())
  return store.dispatch(fetchMovieLinks())
}

const onJournalEnter = () => {
  return store.dispatch(fetchAllTeachDocs())
}

const onSongEnter = () => {
  return store.dispatch(fetchAllTeachDocs())
}

const onTwitterEnter = () => {
  return store.dispatch(fetchAllTeachDocs())
}

const onEntryEnter = (ownProps) => {
  store.dispatch(selectEntryById(ownProps.params.entryId));
  store.dispatch(whoami())
  let userId =  store.getState().auth.user.id
  return store.dispatch(fetchAllTeachDocs())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/JournalInput" component={JournalInputContainer} onEnter={onJournalEnter} />
        <Route path="/SongInput" component={SongInputContainer} onEnter={onSongEnter}/>
        <Route path="/user" component={UserProfileContainer} />
        <Route path="/editUser" component={EditProfileContainer} />
				<Route path="/twitter" component={Twitter} onEnter={onTwitterEnter}/>
				<Route path="/UserHistoryTweets" component={UserHistoryTweets} />
        <Route path={"/entry/:entryId"} component={EntryContainer} onEnter={onEntryEnter}/>
        <Route path={"/entry/:entryId"} component={EntryContainer} onEnter={onEntryEnter}/>
				<Route path="/movies" component={MovieInputContainer} onEnter={onMovieEnter}/>
        <Route path='/showModal' component={ModalContainer} />
        <Route path='/showModalSignUp' component={ModalSignUpContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
