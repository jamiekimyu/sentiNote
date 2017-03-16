import React from 'react';
import { Link } from 'react-router';

export default function User (props) {

  const user = props.user
  if(user) return (
  	<div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
      <p>Id: {user.id}</p>

    </div>
  )
  else return (
    <div>You are not logged in</div>
  )
}




