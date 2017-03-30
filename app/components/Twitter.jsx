import React from 'react';
import UserTweets from './UserTweets';
import SearchTweets from './SearchTweets';

export default function Twitter(){
	return (
		<div className="container twitter">
			<div className='row'>
				<h1 className='title'>Twitter Analysis</h1>
			</div>
			<div className='row'>
				<div className="col-xs-12 col-lg-6">
					<UserTweets />
				</div>
				<div className="col-xs-12 col-lg-6">
					<SearchTweets />
				</div>
			</div>
		</div>
	);
};

