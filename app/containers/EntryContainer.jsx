import Entry from '../components/Entry';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import { emotinator, validateJournal, sentiMentator, bayesinator } from "../utils";
import { teachEmotion, fetchTeachDoc } from "../reducers/teachJournal";
let BayesClassifier = require('bayes-classifier');
let classifier = new BayesClassifier();
let title, content, user, sentimentObject

const mapstate = (state, ownProps) => {

  title = state.entries.selectedEntry.title;
  content = state.entries.selectedEntry.content || '';
  user = state.auth.user;


  let [emotionObject, emotionCount] = emotinator(content)
  sentimentObject = sentiMentator( sentiment(content), 'journal');
  let teachDocs = state.teachDoc.allTeachDocs
  let [smartObject,sentenceArray] = bayesinator(teachDocs, content)

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
    smartObject,
    content
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
}, mapstate)(Entry);

export default connect(mapstate, mapDisptachToProps)(JournalForm);


