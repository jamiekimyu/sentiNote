import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'




const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div>
  {
    label==='Title'&&(
      <div className="">
        <div><label>{label}</label></div>
          <input {...input} placeholder={label} type='textarea' className="form-control field" />
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
 {
    label==='Content'&&(
      <div className="">
        <div><label>{label}</label></div>
          <textarea {...input} placeholder={label} type='textarea' className="form-control field" />
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
  </div>
)}

class JournalInput extends Component {

  render(){
    const handleSubmit = this.props.handleSubmit;
    const submitting = this.props.submitting;
    
    var r2 = sentiment(this.props.content);
    console.log('contentsscore',r2); 

    return (
      <div className="well">
        <h2>New Journal Entry</h2>
        <form onSubmit={handleSubmit}>
          <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
          <Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" />
          <button type="submit" disabled={submitting} className="btn btn-primary">Add Entry</button>
        </form>
        <div>
        <div>Title: {this.props.title}</div>
        <div>Content: {this.props.content}</div>
        </div>
      </div>
    )
  }
}

export default JournalInput;