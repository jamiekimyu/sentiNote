import React from 'react';
import PieChartEmotion from './Graphs/PieChartEmotion';
import {Link} from 'react-router';

const EntryListing = ({entry}) => {
  return(
    <div className='entryListing col-xs-12'>

	    <Link to={`/entry/${entry.id}`}>
			  	<h3>{entry.title}</h3>
			    <PieChartEmotion  emotionObject={entry.emotion} />
			    <p>{entry.content.split(' ').slice(0,10).join(' ') + '. . .'}</p>
			</Link>


    </div>
  );
}

export default EntryListing;
