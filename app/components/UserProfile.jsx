import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';


export default function User (props) {

  const user = props.user.user
  const myEntries = props.user.myEntries
  if(user) return (
  	<div className="flex-container">
      <div className="content">
        <h2 className="title">User Info</h2>
        <div className="userInfo row">
          <div className="col-xs-12">
            <p className='userName'>{user.name}</p>
            <img className='profilePhoto' src={user.photoURL} />
            <p>#Journal Entries: {myEntries.length} <Link to="/editUser"><button className='btn-info'>Edit Profile</button></Link></p>
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




