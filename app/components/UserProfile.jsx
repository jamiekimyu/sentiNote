import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';


export default function User (props) {

  const user = props.user.user
  if(user) return (
  	<div className="flex-container">
      <div className="content">
        <div className="userInfo">
          <h2>User Info</h2>
          <p className='userName'>{user.name}</p>
          <img className='profilePhoto' src={user.photoURL} />
          <p>Id: {user.id}</p>
        </div>
        </div>
      <Footer />
    </div>
  )
  else return (
    <div>You are not logged in</div>
  )
}




