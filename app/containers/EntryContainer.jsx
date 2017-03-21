import Entry from '../components/Entry';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import { emotinator, validateJournal } from "../utils";


let title, content, user, sentimentObject, emotionObject, emotionReturn, emotionCount
const mapstate = (state) => {
  title =  state.entries.selectedEntry.title;
  content =   state.entries.selectedEntry.content;
  user =   state.auth.user;
  sentimentObject = sentiment(content);
  emotionReturn = emotinator(content);
  emotionObject = emotionReturn[0];
  emotionCount = emotionReturn[1];

  const initialValues = {
    title,
    content
  }

  return {
    title,
    content,
    user,
    sentimentObject,
    emotionObject,
    emotionCount,
    initialValues
  }
}

const mapDisptachToProps = (dispatch, ownProps) => {
  return {

  }
}

const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
})(Entry)

export default connect(mapstate, mapDisptachToProps)(JournalForm);


