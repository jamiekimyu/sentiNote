'use strict';

const db = require('APP/db');
const Entry = require('../db/models/entry');
const User = require('../db/models/user');


module.exports = require('express').Router()

  .post('/', (req, res, next) => {
    Entry.create(req.body)
    .then(entry=>
      res.send(entry)
    )
    .catch(next)})
  .get('/:user_id', (req, res, next) => {
  	Entry.findAll({
  		where: {
  			user_id: req.params.user_id
  		}
  	})
  	.then( entries => {
  		res.send(entries);
  	})
  })
  .get('/entry/:entry_id', (req, res, next) => {
    Entry.findById(req.params.entry_id)
    .then( entry => res.json(entry))
  })
