import React from 'react'
import {Link} from 'react-router';
import { NavItem} from 'react-bootstrap';

export const WhoAmI = ({ user, logout }) => (
  <div className='row'>
		<button id='margLeft25' className="inline logout btn btn-info btn-xs " onClick={logout}>Logout</button>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
