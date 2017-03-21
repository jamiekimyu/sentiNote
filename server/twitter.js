'use strict';
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

router.get('/user/:screenName', (req, res, next) => {
	twitterClient.get('statuses/user_timeline', { screen_name: req.params.screenName, count: 200 })
					 .then((tweets) => {
						 res.json(tweets.data);
					 })
					 .catch(next);
});

router.get('/search/:term', (req, res, next) => {
	twitterClient.get('search/tweets', { q: req.params.term, count: 100 })
					 .then((tweets) => {
						 res.json(tweets.data.statuses);
					 })
					 .catch(next);
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

router.get('/track/:topic', (req, res, next) => {
	const results = [];
	getTopicTweets(req.params.topic, results);
	setTimeout(() => {
		res.json(results);
	}, 5100);
});

//get all userTweets
router.get('/experimental/:screenName', (req, res, next) => {

});


module.exports = router;
