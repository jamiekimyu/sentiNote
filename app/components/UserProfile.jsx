import React from 'react';
import { Link } from 'react-router';
import EntryListing from './EntryListing';
import GraphCarousel from './Graphs';
import EntriesCarousel from './Graphs/EntriesCarousel';



export default function User (props) {
  const user = props.user.user
  const myEntries = props.user.myEntries
  const handleClick = props.handleClick

  if(user) return (
    <div className="flex-container">
      <div className="content">
        <h2 className="title">User Info</h2>
        <div className="userInfo">
          <div className='row row-centered'>
            <div className="col-xs-12 col-sm-6">
              <p className='userName'>{user.name}</p>
              <img className='profilePhoto' src={user.photoURL} />
              <p>#Journal Entries: {myEntries.length} <Link to="/editUser"><button className='btn-info'>Edit Profile</button></Link></p>
            </div>
            <div className="col-xs-12 col-sm-6 ">
              <h2>Description: </h2>
              <p> {user.description} </p>
            </div>
            <div className="col-xs-12 col-sm-12">
              <h2> Previous Entries </h2>
              <EntriesCarousel entries={myEntries} handleClick={handleClick}/>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
  else return (
    <div>You are not logged in</div>
  )
}




