import Entry from '../components/Entry';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import { validateJournal } from "../utils";
import {addEntry} from '../reducers/entry'
import { teachEmotion, fetchAllTeachDocs } from "../reducers/teachJournal";
const moment = require('moment')

let user

const mapstate = (state, ownProps) => {
  let title = state.entries.selectedEntry.title;
  let content = state.entries.selectedEntry.content || '';
  user = state.auth.user;
  let teachDocs = state.teachDoc.allTeachDocs
  let date = moment(state.entries.selectedEntry.created_at).format('ll')
  
  return {
    title,
    user,
    content,
    teachDocs,
    date
  }
}

const mapDisptachToProps = (dispatch, ownProps) => {
  return {
    teachEmotion (sentence, emotion) {
    dispatch(teachEmotion(sentence,emotion,user.id));
    dispatch(fetchAllTeachDocs())
    }
  }
}

const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
}, mapstate)(Entry);

export default connect(mapstate, mapDisptachToProps)(JournalForm);


