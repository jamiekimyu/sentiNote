'use strict'

const db = require('APP/db')
let lyr = require('lyrics-fetcher');
 
lyr.fetch('Led Zeppelin', 'Stairway to Heaven', function (err, lyrics) {
    console.log(err || lyrics);
});

module.exports = require('express').Router()

  .post('/', (req, res, next) => {
    lyr.fetch(req.body.song_artist, req.body.song_title, function (err, lyrics) {
    	res.send(err || lyrics);
	})
   })
