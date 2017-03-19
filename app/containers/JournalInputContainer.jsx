import JournalInput from '../components/JournalInput';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import { emotinator, validateJournal } from "../utils";


let title, content, user, sentimentObject,emotionObject
const mapstate = (state) => {
	title =  state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.title ? state.form.journalForm.values.title : '' : '' : ''
  content =   state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.content ? state.form.journalForm.values.content : '' : '' : ''
  user =   state.auth
  sentimentObject = sentiment(content)
  emotionObject = emotinator(content)

  return {
    title,
    content,
    user,
    sentimentObject,
    emotionObject
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     addEntry (e) {
      e.preventDefault()
      dispatch(addEntry({title,content,sent:sentimentObject,emotion:emotionObject,user_id:user.id}))
      dispatch(reset('journalForm'))
    }
  }
}

const JournalForm = reduxForm({
  form: 'journalForm',
  validateJournal
})(JournalInput)

export default connect(mapstate, mapDisptachToProps)(JournalForm);


