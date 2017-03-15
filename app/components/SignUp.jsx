import React from 'react';

export  function Signup ({signup}){


  return (
    <div className="well floatleft margin10">
      <h4>Sign up for a new account</h4>

      <form onSubmit={evt => {
      evt.preventDefault()
      signup(evt.target.username.value, evt.target.email.value, evt.target.password.value)
    } }>
        <div className="form-group">
          <label>Name:  </label>
          <input name="username" placeholder="name"/>
        </div>
        <div className="form-group">
          <label>Email:  </label>
          <input name="email" placeholder="email" />
        </div>
        <div className="form-group">
          <label>Password:  </label>
          <input name="password" type="password" placeholder="password"/>
        </div>
        <button type="submit" value="Signup" className="btn btn-primary">Sign Up </button>


    </form>
  </div>
    );
}

import {signup} from 'APP/app/reducers/signup'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {signup},
) (Signup)
