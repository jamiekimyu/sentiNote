import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'

import PieChart from './Graphs/PieChart'

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';


const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
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
    const submitting = this.props.submitting;
    
    var sentimentObject = sentiment(this.props.content);
    console.log('contentsscore',sentimentObject); 

    let emotion = require('../emotion');

    let emotionObject = {}
    let wordArray = this.props.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')

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
    console.log('emotion!', emotionObject )

    return (
      <div className="flex-container">
        <Header />
        <Sidebar />
        <div className= "content">
          <h2>New Journal Entry</h2>
          <form onSubmit={this.props.addEntry}>
            <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
            <Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" />
            <Field name="user" type="hidden"  value={this.props.user} component={renderField} />
            <button type="submit" disabled={submitting} className="btn btn-primary">Add Entry</button>
          </form>
          <div>
            <div>Title: {this.props.title}</div>
            <div>Content: {this.props.content}</div>
          </div>
        </div>
        <div>
          <h1>Graph</h1>
          <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
        </div>
        <Footer />
      </div>
    )
  }
}

export default JournalInput;
