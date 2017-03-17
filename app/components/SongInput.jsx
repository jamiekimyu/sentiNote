import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import PieChart from './Graphs/PieChart'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { TagCloud } from "react-tagcloud";

let emotionWord, emotionInstances, array = [], data  = [], emotion = require('../emotion'), errorString = "Sorry, We don't have lyrics for this song yet."

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

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.analyzeSong(e)
  }  

  render(){
    const submitting = this.props.submitting;
    let sentimentObject, emotionObject

    if(this.props.lyrics===errorString){
      sentimentObject = {}
      emotionObject = {}
    }else {
      sentimentObject = sentiment(this.props.lyrics);
      emotionObject = {}
      let wordArray = this.props.lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')
      let preData = {}

      wordArray.forEach(word=>{
        if(emotion[word]){
          if(!preData[word]){
            preData[word]=[emotion[word],1]
          }else{
            preData[word][1]=preData[word][1]+1
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
      
      for(let key in preData) {
        data.push({value: key, count: preData[key][1]})
      }
    }

    const customRenderer = (tag, size, color) => (
      <span key={tag.value}
        style={{
          fontSize: `${size+1}em`,
          margin: '3px',
          padding: '3px',
          display: 'inline-block',
          color: `${color}`
        }}>{tag.value}</span>
    );

    return (
      <div className="flex-container">
        <Header />
        <Sidebar />
        <div className= "content">
          <h2>Analyze a Song</h2>
          <form onSubmit={this.handleClick}>
            <Field name="song_title" type="text" className="" component={renderField} id="song_title" label="Song Title" />
            <Field name="song_artist" type="text" className="" component={renderField} id="song_artist" label="Artist" />
            <button type="submit" disabled={submitting} className="btn btn-primary">Analyze Song</button>
          </form>
          <div>Content: {this.props.lyrics} </div>
        </div>


        <div className="flex-container">
          <h1>Graph</h1>
          <PieChart sentimentObject={sentimentObject} emotionObject={emotionObject}/>
        </div>

        <div className="flex-container">
           <TagCloud 
            minSize={1}
            maxSize={2}
            tags={data.concat([])}
            onClick={
              tag => {
                emotionWord=tag.value; 
                emotionInstances=tag.count; 
                array = (emotion[tag.value]);
                this.setState({alertShow:true});
              }
            }
            renderer={customRenderer}
            shuffle={false}          
          />
          {
            this.state.alertShow&&(
              <div className="alert alert-info" onClick={e=>{this.setState({alertShow:false})}}>
                <a className="close" aria-label="close">&times;</a>
                <p>Emotion Lexicon KeyWord : {emotionWord}</p>
                <p>Instances: {emotionInstances} </p>
                <span>Associated Emotions: </span>
                { array.map(emotion=>(<span>{emotion + " "}</span>)) }
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
