'use strict';
const express = require('express');
const router = express.Router();
const TwitterUtils = require('./twitterUtils');

router.get('/user/:screenName', (req, res, next) => {
	TwitterUtils.twitterClient.get('statuses/user_timeline',
		{ screen_name: req.params.screenName, count: 200 }
	)
	.then((tweets) => {
		res.json(tweets.data);
	})
	.catch(next);
});

router.get('/search/:term', (req, res, next) => {
	TwitterUtils.twitterClient.get('search/tweets', { q: req.params.term, count: 100 })
	.then((tweets) => {
		res.json(tweets.data.statuses);
	})
	.catch(next);
});

router.get('/track/:topic', (req, res, next) => {
	const results = [];
	TwitterUtils.getTopicTweets(req.params.topic, results);
	setTimeout(() => {
		res.json(results);
	}, 5100);
});

//get all userTweets if pages = 16, a page = about 200 tweets
router.get('/history/:screenName/:pages', (req, res, next) => {
	let timelineProm =
		TwitterUtils.getUserTweetHistory(req.params.screenName, req.params.pages);
	timelineProm
	.then((tweetsData) => {
		res.json(tweetsData);
	})
	.catch(next);
});

module.exports = router;
