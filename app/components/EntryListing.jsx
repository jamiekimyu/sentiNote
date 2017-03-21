import React from 'react';
import PieChart from './Graphs/PieChart';
import Link from 'react-router';

const EntryListing = ({entry, handleClick}) => {
  return(
  	<div className='center entry-listing col-xs-12 col-md-6' >
      <p className='text-warning'>{entry.title}</p>
      <button onClick={ (e) => handleClick(e, entry.id)}> Check it out! </button>
      <PieChart emotionObject={entry.emotion} />
      {/*<Link to="/">Go to home!</Link>*/}
    </div>
);
}

export default EntryListing;
