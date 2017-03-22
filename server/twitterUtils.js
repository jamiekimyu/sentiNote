const Twit = require('twit');
const dotenv = require('dotenv');
dotenv.load();

const twitterClient = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const getTopicTweets = (topic, results) => {
	let stream = twitterClient.stream('statuses/filter', {track: topic});
	stream.on('tweet', (tweet) => {
		results.push(tweet);
	});
	setTimeout(() => {
		stream.stop();
	}, 5000);

	stream.on('error', (error) => {
		return error;
	});
};

const getUserTweetHistory = (screenName, pages) => {
	let userTweetHistory = new Promise((resolve, reject) => {
		if(pages < 1){
			resolve([]);
		}

    if(pages > 16){
      pages = 16;
    }

	  let tweetsData = [];
		let internalPageCount = 1;
	  searchAndRetrieveTweets();

	  function searchAndRetrieveTweets(lastId){
	    const args = {
	      screen_name: screenName,
	      count: 200,
	      include_rts: 1
	    };

	    if(lastId)
			{
				args.max_id = lastId;
			}

	    twitterClient.get('statuses/user_timeline', args, onTimeline);

	    function onTimeline(error, chunk){
	      if (error) {
	        console.log('Twitter search and retrieve failed!');
					reject(error);
	      }

	      if (!chunk.length) {
	        console.log('User has no tweets');
					reject(error);
	      }

	      if (tweetsData.length){
					chunk.shift();
				}

	      tweetsData = tweetsData.concat(chunk);
	      let thisId = parseInt(tweetsData[tweetsData.length - 1].id_str, 10);

	      if (chunk.length && internalPageCount < pages){
					internalPageCount++;
					return searchAndRetrieveTweets(thisId);
				}

				resolve(tweetsData);
	    }
	  }
	});
	return userTweetHistory;
};

module.exports = {
  twitterClient,
  getTopicTweets,
  getUserTweetHistory
};
