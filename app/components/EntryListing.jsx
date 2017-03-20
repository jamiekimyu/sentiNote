import React from 'react';
import PieChart from './Graphs/PieChart';

const EntryListing = ({entry}) => (
	<div className='center entry-listing col-xs-12 col-md-6' >
		<p className='text-warning'>Title: {entry.title}</p>
		<PieChart emotionObject={entry.emotion} />
	</div>
);

export default EntryListing;
