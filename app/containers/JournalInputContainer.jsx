import JournalInput from '../components/JournalInput';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import { emotinator, validateJournal, sentiMentator } from "../utils";
import Lexed from "lexed";
let BayesClassifier = require('bayes-classifier');
let classifier = new BayesClassifier();

let title, content, user, sentimentObject, emotionObject, emotionCount
const mapstate = (state) => {
  title =  state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.title ? state.form.journalForm.values.title : '' : '' : ''
  content =   state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.content ? state.form.journalForm.values.content : '' : '' : ''
  user =   state.auth.user
  let emotionReturn = emotinator(content)
  emotionObject = emotionReturn[0];
  emotionCount = emotionReturn[1];
  console.log('eeemocount',emotionCount)
  sentimentObject =  sentiMentator( sentiment(content) , 'journal' )

  let sentenceArray = new Lexed(content).sentenceLevel()
  
  let teachDoc = state.teachDoc.currentTeachDoc
  let smartObject = {}
  
  for(let key in teachDoc){
    if(Array.isArray(teachDoc[key])&&teachDoc[key].length){
      classifier.addDocuments(teachDoc[key], key)
    }
  }
   classifier.train()

  sentenceArray.forEach(sentence=>{
    let arrayOfEmotions = classifier.getClassifications(sentence)
    console.log('arrr', arrayOfEmotions)
    arrayOfEmotions.forEach(obj=>{
      if(smartObject[obj.label]){
        smartObject[obj.label] = smartObject[obj.label] + obj.value
        console.log(obj.label, smartObject[obj.label])
      }else {
        smartObject[obj.label] = obj.value
      }
    })
  })



  return {
    title,
    content,
    user,
    sentimentObject,
    emotionObject,
    emotionCount,
    smartObject
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     addEntry (e) {
      e.preventDefault()
      dispatch(addEntry({title,content,sent:sentimentObject,emotion:emotionObject,user_id:user.id}))
      dispatch(reset('journalForm'))
      window.location.replace('http://localhost:1337/user')
    }
  }
}

const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
})(JournalInput)

export default connect(mapstate, mapDisptachToProps)(JournalForm);


