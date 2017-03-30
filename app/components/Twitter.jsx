import React from 'react';
import UserTweets from './UserTweets';
import SearchTweets from './SearchTweets';

export default function Twitter(){
	return (
		<div className="container twitter">
			<div className='row'>
				<h1 className='margBot30' >Twitter Analysis</h1>
			</div>
			<div className='row twitBox'>
				<div className="row">
					<UserTweets />
				</div>
				<div className="row top100">
					<SearchTweets />
				</div>
			</div>
		</div>
	);
};

