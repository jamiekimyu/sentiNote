'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/entries', require('./entries'))
  .use('/twitter', require('./twitter'))
  .use('/songs', require('./songs'))
  .use('/movies', require('./movies'))

api.use((req, res) => res.status(404).end())
