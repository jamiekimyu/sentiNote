import React from 'react';
import PieChartEmotion from './Graphs/PieChartEmotion';
import Link from 'react-router';

const EntryListing = ({entry, handleClick}) => {
  return(
  	<div className='center entry-listing col-xs-12 col-md-6' >
      <p className='text-warning'>{entry.title}</p>
      <button onClick={ (e) => handleClick(e, entry.id)}> Check it out! </button>
      <div className='pieBox'>
        <PieChart  emotionObject={entry.emotion} />
      </div>
    </div>
);
}

export default EntryListing;
