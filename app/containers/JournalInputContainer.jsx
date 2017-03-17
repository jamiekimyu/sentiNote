import JournalInput from '../components/JournalInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {addEntry} from '../reducers/entry'
import sentiment from 'sentiment'





let title, content, user, sent
const mapstate = (state) => {
	title =  state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.title ? state.form.journalForm.values.title : '' : '' : ''
  content =   state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.content ? state.form.journalForm.values.content : '' : '' : ''
  user =   state.auth
  sent = sentiment(content)




  return {
    title,
    content,
    user
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     addEntry (e) {
      e.preventDefault()
      let emotionObject={}
      let emotion = require('../emotion');
      let wordArray = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')

      wordArray.forEach(word=>{
        if(emotion[word]){
          emotion[word].forEach(match=>{
            if (!emotionObject[match]) {
              emotionObject[match]=1
            }else{
              emotionObject[match] = emotionObject[match] + 1
            }
          })
        }
      })
      dispatch(addEntry({title,content,sent,emotion:emotionObject,user_id:user.id}))
    }

  }
}


const JournalForm = reduxForm({
  form: 'journalForm',
  validate
})(JournalInput)

export default connect(mapstate, mapDisptachToProps)(JournalForm);



 let validate = function (values) {
  const error = {}
  if (!values.title) {
    error.title = 'A Title is Required'
  }
  if (!values.content) {
    error.content = 'Content is Required'
  }
  console.log('Errors======>', error)
  return error
}
