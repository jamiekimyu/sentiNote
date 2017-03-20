import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import { Field } from 'redux-form'


export default function User (props) {

  const user = props.user.user
  const myEntries = props.user.myEntries
  if(user) return (
  	<div className="flex-container">
      <div className="content">
        <div className="userInfo row">
          <h2>Edit User Info</h2>
          <div className="col-xs-12">
            <p className='userName'>{user.name}</p>
            <img className='profilePhoto' src={user.photoURL} />
            <p>#Journal Entries: {myEntries.length} <button className='btn-info'>Edit Profile</button></p>
          </div>
          <div className="col-xs-12">
            <h2>Description: </h2>
            <p> {user.description} </p>
          </div>

        </div>
        </div>
      <Footer />
    </div>
  )
  else return (
    <div>You are not logged in</div>
  )
}




