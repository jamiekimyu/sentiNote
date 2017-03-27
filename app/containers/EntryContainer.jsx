import Entry from '../components/Entry';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import Lexed from "lexed";
import { emotinator, validateJournal, sentiMentator } from "../utils";
import { teachEmotion, fetchTeachDoc } from "../reducers/teachJournal";
let BayesClassifier = require('bayes-classifier');
let classifier = new BayesClassifier();
let title, content, user, sentimentObject
const mapstate = (state) => {
  title =  state.entries.selectedEntry.title;
  content =   state.entries.selectedEntry.content;
  user =   state.auth.user;

  let [emotionObject, emotionCount] = emotinator(content)
  sentimentObject = sentiMentator( sentiment(content), 'journal');
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
    
    arrayOfEmotions.forEach(obj=>{
      if(smartObject[obj.label]){
        smartObject[obj.label] = smartObject[obj.label] + obj.value
      }else {
        smartObject[obj.label] = obj.value
      }
    })
  })
 
  const initialValues = {
    title,
    content
  };

  return {
    title,
    sentenceArray,
    user,
    sentimentObject,
    emotionObject,
    emotionCount,
    initialValues,
    smartObject
  }
}

const mapDisptachToProps = (dispatch, ownProps) => {
  return {
    teachEmotion (sentence, emotion) {
    dispatch(teachEmotion(sentence,emotion,user.id));
    dispatch(fetchTeachDoc(user.id))
    }
  }
}


const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
})(Entry);

export default connect(mapstate, mapDisptachToProps)(JournalForm);


