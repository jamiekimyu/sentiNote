import JournalInput from '../components/JournalInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'




const mapstate = (state) => {
	let title =  state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.title ? state.form.journalForm.values.title : '' : '' : ''
  	let content =   state.form.journalForm ? state.form.journalForm.values ? state.form.journalForm.values.content ? state.form.journalForm.values.content : '' : '' : ''
  

  return {

  title,
  content

  }
}

const mapDisptachToProps = (dispatch) => {
  return {

  	// handleSubmit() {
  	// 	return
  	// }

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