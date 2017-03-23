import React from 'react';
import PieChartEmotion from './Graphs/PieChartEmotion';
import Link from 'react-router';

const EntryListing = ({entry, handleClick}) => {
  return(
	  <div className='pieBox1' onClick={handleClick}>{
	    <PieChartEmotion  emotionObject={entry.emotion} />}
	  </div>
	);
}

export default EntryListing;
