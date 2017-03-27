import React from 'react';
import PieChartEmotion from './Graphs/PieChartEmotion';
import {Link} from 'react-router';

const EntryListing = ({entry}) => {
	console.log("This is an entry in EntryListing", entry);
  return(
    <div className='pieBox1'>
	  <Link to={`/entry/${entry.id}`}>
        <PieChartEmotion  emotionObject={entry.emotion} />
	  </Link>
    </div>
  );
}

export default EntryListing;
