'use strict'

const db = require('APP/db')
const Entry = require('../db/models/entry') 
const User = require('../db/models/user') 


module.exports = require('express').Router()

  .post('/', (req, res, next) => {
    console.log('reeqquizle',req.body)
    Entry.create(req.body)
    .then(entry=>
      res.send(entry)
    )
    .catch(next)})

