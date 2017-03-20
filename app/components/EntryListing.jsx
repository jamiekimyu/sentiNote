import React from 'react';
import PieChart from './Graphs/PieChart';

const EntryListing = ({entry, handleClick}) => {
	return(
  <div className='center entry-listing col-xs-12 col-md-6' >
    <p className='text-warning'>{entry.title}</p>
    <button onClick={ (e) => handleClick(e, entry.id)}> Check it out! </button>
    <PieChart emotionObject={entry.emotion} />
  </div>
);
}

export default EntryListing;
