'use strict'

const db = require('APP/db')
const TeachDoc = require('../db/models/teachDoc')
const User = require('../db/models/user')

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    let emotion = req.body.emotion
    let sentence = req.body.sentence

    TeachDoc.find({where: {user_id:req.body.userID} })
   .then(doc=>{
	   	if(doc){
	   		doc.update({[emotion] : doc.dataValues[emotion].concat(sentence)})
	   	}else{
	   		TeachDoc.create({user_id: req.body.userID, [emotion] : [sentence]})
	   	}
   }).then(doc=>
   		res.send(doc)
   ).catch(next)
  })

  .get('/', (req, res, next) => {
    TeachDoc.findAll()
   .then(docs=>{
      res.send(docs)
   }).catch(next)
 })
  
  .get('/:userId', (req, res, next) => {
    let emotion = req.body.emotion
    let sentence = req.body.sentence
    TeachDoc.find({where: {user_id: req.params.userId}})
   .then(doc=>{
   	  res.send(doc)
   }).catch(next)
 })











