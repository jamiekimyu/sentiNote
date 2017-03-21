import JournalInput from '../components/JournalInput';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'
import { emotinator, validateJournal, sentiMentatorJournal } from "../utils";


let title, content, user, sentimentObject,emotionObject, emotionReturn, emotionCount
const mapstate = (state) => {
	title =  state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.title ? state.form.journalForm.values.title : '' : '' : ''
  content =   state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.content ? state.form.journalForm.values.content : '' : '' : ''
  user =   state.auth
  sentimentObject = sentiment(content)
  emotionReturn = emotinator(content)
  emotionObject = emotionReturn[0]
  emotionCount = emotionReturn[1]

  let {posWithVals, negsWithVals, orderedWordsRating} = sentiMentatorJournal(sentimentObject)
  let totalPositive = posWithVals.reduce((a,b)=>a+b[1],0)
  let totalNegative = negsWithVals.reduce((a,b)=>a+b[1],0)
  sentimentObject = Object.assign({},sentimentObject,{posWithVals,negsWithVals,orderedWordsRating,totalPositive,totalNegative})


  return {
    title,
    content,
    user,
    sentimentObject,
    emotionObject,
    emotionCount,
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


