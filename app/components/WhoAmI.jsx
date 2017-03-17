import React from 'react'
import {Link} from 'react-router';

export const WhoAmI = ({ user, logout }) => (
  <div>
	  <Link to="/user">
		  <div className="whoami">
		    <span className="whoami-user-name">Hello, {user.user && user.user.name}!</span> <br />

		  </div>
	  </Link>
	  <Link to="/home"><button className="logout btn btn-primary" onClick={logout}>Logout</button></Link>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
