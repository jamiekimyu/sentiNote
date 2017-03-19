import React from 'react'
import {Link} from 'react-router';
import { NavItem} from 'react-bootstrap';

export const WhoAmI = ({ user, logout }) => (
  <div className='row'>
  	<NavItem className='inline' eventKey={1} >
  		<Link to="/user">
			<p  className="whoami-user-name text-success floatLeft margTop8"  >Hello, {user.user && user.user.name}!</p> 
		</Link>
		<button id='margLeft15' className="inline logout btn btn-info btn-xs " onClick={logout}>Logout</button>
	</NavItem>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
