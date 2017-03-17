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

      <div className="">
        <div><label>{label}</label></div>
          <input {...input} placeholder={label} type='textarea' className="form-control field" />
          {touched && error && <span>{error}</span>}
      </div>  
  </div>
)}

class SongInput extends Component {

  render(){
     const submitting = this.props.submitting;
     console.log('preelos',this.props)
     let sentimentObject, emotionObject

     let errorString = "Sorry, We don't have lyrics for this song yet."
     if(this.props.lyrics===errorString){
      sentimentObject = {}
      emotionObject = {}
     }else {
        sentimentObject = sentiment(this.props.lyrics);
        let emotion = require('../emotion');
        emotionObject = {}
        let wordArray = this.props.lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')

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
     }


    return (
      <div className="flex-container">
        <Header />
        <Sidebar />
        <div className= "content">
          <h2>Analyze a Song</h2>
          <form onSubmit={this.props.analyzeSong}>
            <Field name="song_title" type="text" className="" component={renderField} id="song_title" label="Song Title" />
            <Field name="song_artist" type="text" className="" component={renderField} id="song_artist" label="Artist" />
            <button type="submit" disabled={submitting} className="btn btn-primary">Analyze Song</button>
          </form>
          <div>
            <div>Content: {this.props.lyrics} </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="flex-container noFlex">
=======
        <div className="flex-container">
>>>>>>> 7f596428f549cb18c26a7b25c7f74f2462eba825
          <h1>Graph</h1>
         <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SongInput;
