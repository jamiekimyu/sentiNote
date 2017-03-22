'use strict'

const db = require('APP/db')
const request = require('request')
const cheerio = require('cheerio')
const allMovies = 'http://www.imsdb.com/all%20scripts/'

module.exports = require('express').Router()

  .get('/linksAndTitles', (req, res, next) => {
 	request(allMovies, function(err, response, html){  
        var $ = cheerio.load(html);
        $ = cheerio.load($("h1:contains(\"All Movie Scripts\")").parent()[0])
        var movieTable = $("h1:contains(\"All Movie Scripts\")").parent();
        var allMovieTitles = $('a[href^="/Movie Scripts"]').map(function(thing){ 
            return $(this).text()
        })
 		allMovieTitles = Array.prototype.slice.call(allMovieTitles);
		let titlesPlusLinks = allMovieTitles.map(title=> {
         	return { title, link: ('http://www.imsdb.com/scripts/' + title.replace(/\s+/g, '-') + '.html') }
         })
         res.send(titlesPlusLinks)
    })
   })

    .post('/scripts', (req, res, next) => {
	  let url = req.body.scriptLink
	  request(url, function (error, response, body) {
		var $page = cheerio.load(body),
		text = $page("body").text();
		res.send({text})
	  })
    })

