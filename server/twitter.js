'use strict'
const express = require('express');
const router = express.Router();

var Twit = require('twit');
const dotenv = require('dotenv');
dotenv.load();

const twitterClient = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

router.get('/', (req, res, next) => {
	console.log('====================here');
	res.json('HERE');
});

router.get('/user/:screenName', (req, res, next) => {
	console.log(req.params.screenName);

	twitterClient.get('statuses/user_timeline', { screen_name: req.params.screenName, count: 200 })
					 .then((tweets) => {
						 console.log('HERE',tweets);
						 res.json(tweets.data);
					 })
					 .catch(next);
});

/*router.get('/track/:topic', (req, res, next) => {
	const tweets = [];
	twitterClient.stream('statuses/filter', {track: 'love'}, (stream) => {
	stream.on('data', (tweet) => {
		tweets.push(tweet);
		//stream.destroy();
		//process.exit(0);
	})
	setTimeout()
							 .then((tweets) => {
								 res.json(tweets.data);
							 })
							 .catch(next);
});*/
module.exports = router;
