import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment';
import PieChartEmotion from './Graphs/PieChartEmotion';
import PieChartPolarity from './Graphs/PieChartPolarity';
import Footer from './Footer';
import { TagCloud } from "react-tagcloud";
import { customRenderer } from '../utils';
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')


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
    let {submitting, sentimentObject, emotionObject, emotionCount} = this.props
  
    console.log('sentiment rating:',sentimentObject); 
    console.log('emotion analysis:', emotionObject )
    console.log('emotion count:', emotionCount )


    return (
      <div className='container'>
        <div className="row ">
          <h1 id='songHeading'>Analyze Song Lyrics</h1>
        </div>
      
        <div className="row row-centered">
          <form className='journalForm' onSubmit={this.handleClick}>
            <Field name="song_title" type="text" className="" component={renderField} label="Title" />
            <Field name="song_artist" type="text" className="" component={renderField} label="Artist" />
            <button type="submit" disabled={submitting} id='songSubmit' className="btn btn-success" onClick={e=>this.setState({alertShow:false})}>Analyze Song</button>
          </form>
             <div className='row row-centered' id='pT'>
              <textarea  cols='160' value={this.props.lyrics} placeholder="Lyrics" id='lyricText' />
            </div>
        </div>
      
        <div className="row row-centered">
          <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
            <PieChartEmotion emotionObject={emotionObject} />
          </div>  
          <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
            <PieChartPolarity sentimentObject={sentimentObject} />
          </div> 
          <div className="row">
            <TagCloud 
              minSize={1}
              maxSize={2}
              tags={emotionCount.concat([])}
              renderer={customRenderer}
              shuffle={false}
              onClick={
                tag => {
                  emotionWord=tag.value
                  emotionInstances=tag.count 
                  array = (emotion[tag.value])
                  this.setState({alertShow:true})
                }
              }          
              />
            </div>
          </div>
          
          <div className='row'>
            {
              this.state.alertShow&&(
                <div className="alert alert-info" onClick={e=>{this.setState({alertShow:false})}}>
                  <a className="close" aria-label="close">&times;</a>
                  <h4 id='emotText'>{emotionWord[0].toUpperCase()+emotionWord.slice(1)}</h4>
                  <p>Instances: {emotionInstances} </p>
                  <span>Associated Emotions: </span>
                  { array.map(emotion=>(<span>{emotion + " "}</span>)) }
                </div>
              )
            }
          </div>     
          <Footer/>
      </div>
    )
  }
}

export default SongInput;

const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
      <div className="left">
          <div className=''>
          <input {...input} placeholder={label} type='textarea' className="form-control field" id={"song"+label} required/>
          {touched && error && <span>{error}</span>}
          </div>
      </div>  
  </div>
)}





              














