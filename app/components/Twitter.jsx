import React from 'react';
import UserTweets from './UserTweets';
import SearchTweets from './SearchTweets'
;
export default function Twitter(){
	return (
		<div className="twitter">
			<UserTweets />
			<SearchTweets />
		</div>
	);
}
