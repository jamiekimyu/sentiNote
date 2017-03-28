import React from 'react'


export const Login = ({ login }) => (
  <div className='row'>
    <div className="col-xs-12 col-md-3">
      <form onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.username.value, evt.target.password.value)}}
      >
          <input id='email' className='form-control input-xs' type="text" name='username' placeholder="email" />
          <input id='pwd' className='form-control input-xs' placeholder="password" name='password' type='password' />
          <button id='loginButton' className='btn btn-primary btn-xs'  type="submit">Login</button>
      </form>
    </div>
    <div className="col-xs-12 col-md-3">
      <a href="/api/auth/login/facebook" ><img id="facebookLogin" src='/facebookLogin.png'/></a>
    </div>
    <div className="col-xs-12 col-md-3">
      <a href="/api/auth/login/google"> <img id='googleLogin' src='/googleLogin.png'/></a>
    </div>
    <div className="col-xs-12 col-md-3">
      <a href="/api/auth/login/twitter"> <img id='twitterLogin' src='/twitterLogin.png'/></a>
    </div>
  
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
