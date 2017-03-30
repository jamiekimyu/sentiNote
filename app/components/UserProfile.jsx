import React, { Component } from 'react';
import { Link } from 'react-router';
import EntriesCarousel from './Graphs/EntriesCarousel';
import EntryList from './EntriesList';
import ReactPaginate from 'react-paginate';


export default class User extends Component{
  constructor(props){
    super(props);
    this.state= {
      user: props.user.user,
      myEntries: props.user.myEntries,
      filter: ''
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);

  }

  handleFilterChange(e){
    this.setState({
      filter: e.target.value
    })
  }


  render(){
    const user = this.state.user;
    const myEntries = this.state.myEntries.reverse().filter( entry => {
      return entry.title.match(this.state.filter) || entry.content.match(this.state.filter);
    });
    if(user) return (
      <div className="container">
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
                <h2> Previous Entries</h2>
                <input placeholder="Filter Entries" id='entriesFilter' onChange={(e) => this.handleFilterChange(e)}/>
                <div className='entriesBox'>
                  <EntryList entries={myEntries} />
                </div>
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

}




