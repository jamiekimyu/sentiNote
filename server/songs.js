'use strict'

const db = require('APP/db')
let lyr = require('lyrics-fetcher');
 

module.exports = require('express').Router()

  .post('/', (req, res, next) => {
    lyr.fetch(req.body.song_artist, req.body.song_title, function (err, lyrics) {
    	res.send(err || lyrics);
	})
   })
