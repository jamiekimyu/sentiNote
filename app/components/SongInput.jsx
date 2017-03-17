import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import PieChart from './Graphs/PieChart'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { TagCloud } from "react-tagcloud";

let emotionWord = ''
let emotionInstances
let data = []
let array = []
let key = 0
let data2  = [];
let emotion = require('../emotion');
let alertShow = false
let alertText = ''
let showAlert = function(){
  return alertShow = true
}
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
        emotionObject = {}
        let wordArray = this.props.lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')

        
        let deeta = {}

        wordArray.forEach(word=>{
          if(emotion[word]){
            if(!deeta[word]){
              deeta[word]=[emotion[word],1]
            }else{
              deeta[word][1]=deeta[word][1]+1
            }
            emotion[word].forEach(match=>{
              if (!emotionObject[match]) {
                emotionObject[match]=1

              }else{
                emotionObject[match] = emotionObject[match] + 1
              }
            })
          }
        })
        for(let deet in deeta) {
          data.push({value: deet, count: deeta[deet][1]})
        }
        console.log('deeta',deeta)
        console.log('data',data)
        console.log('data2',data2)

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


        <div className="flex-container">
          <h1>Graph</h1>
         <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
        </div>

        <div className="flex-container">
           <TagCloud minSize={20}
            maxSize={70}
            tags={data2.concat(data)}
            onClick={tag => {emotionWord=tag.value; emotionInstances=tag.count; array = (emotion[tag.value]);alertShow=true;this.forceUpdate() }}
            key={key++}
            shuffle={false}          />
          {
            alertShow&&(
             
                 <div className="alert alert-info" onClick={e=>{alertShow=false; this.forceUpdate()}}>
                  <a className="close" aria-label="close">&times;</a>
                <p>Emotion Lexicon KeyWord : {emotionWord}</p>
                <p>Instances: {emotionInstances} </p>
                <span>Associated Emotions: </span>
                {array.map(emotion=>(
                  <span>{emotion + " "}</span>

                  ))
              }
               </div>

        
           
            )
          }

        </div>

        <Footer />
      </div>
    )
  }
}

export default SongInput;
