import Entry from '../components/Entry';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import {addEntry, selectEntryById} from '../reducers/entry';
import sentiment from 'sentiment';
import { emotinator, validateJournal, sentiMentator } from "../utils";

let title, content, user, sentimentObject
const mapstate = (state, ownProps) => {

  title =  state.entries.selectedEntry.title;
  content =   state.entries.selectedEntry.content;
  user =   state.auth.user;
  // let [emotionObject, emotionCount] = emotinator(content);
  // sentimentObject = sentiMentator( sentiment(content), 'journal');

  const initialValues = {
    title,
    content
  };

  return {
    title,
    content,
    user,
    initialValues
  };
};

const mapDisptachToProps = (dispatch, ownProps) => {
  return {

  };
};

const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
}, mapstate)(Entry);

export default connect(mapstate, mapDisptachToProps)(JournalForm);


