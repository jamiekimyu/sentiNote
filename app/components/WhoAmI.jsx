import React from 'react'
import {Link} from 'react-router';

export const WhoAmI = ({ user, logout }) => (
  <Link to="/user">
	  <div className="whoami">
	    <span className="whoami-user-name">{user && user.name}</span>
	    <button className="logout btn btn-primary" onClick={logout}>Logout</button>
	  </div>
  </Link>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
