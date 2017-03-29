import React from 'react';

export  function Signup ({signup}){
  return (
    <div>
      <div className='row center'>
        <form onSubmit={evt => {
          evt.preventDefault()
          signup(evt.target.username.value, evt.target.email.value, evt.target.password.value)}}>
          <div className="form-group">
            <div><label>Name</label></div>
            <input name="username" placeholder="name" required/>
          </div>
          <div className="form-group">
            <div><label>Email  </label></div>
            <input name="email" placeholder="email" required/>
          </div>
          <div className="form-group">
            <div><label>Password  </label></div>
            <input name="password" type="password" placeholder="password" required/>
          </div>
          <button type="submit" value="Signup" id='widerButton' className="btn btn-primary btn-sm">Sign Up </button>
        </form>
      </div>

    </div>
  );
}

import {signup} from 'APP/app/reducers/signup'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {signup},
) (Signup)
