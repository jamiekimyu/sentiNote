import React from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function User (props) {

  const user = props.user.user
  if(user) return (
  	<div className="flex-container">
      <Header />
      <Sidebar />
      <div className="content">
        <div className="userInfo">
          <h2>User Info</h2>
          <p>Name: {user.name}</p>
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




