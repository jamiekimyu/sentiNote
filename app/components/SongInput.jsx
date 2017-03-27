import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment';
import GraphCarousel from './Graphs';
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
    return (
      <div className='container'>

        <div className="row ">
          <h1 id='songHeading' className='title'>Analyze Song Lyrics</h1>
        </div>

        <div className='row centered'>
          <div className="col-xs-12 col-lg-6">
            <form onSubmit={this.handleClick}>
              <Field name="song_title" type="text"  component={renderField} label="Title" />
              <br />
              <br />
              <Field name="song_artist" type="text" component={renderField} label="Artist" />
              <button type="submit" disabled={submitting} id='songSubmit' className="btn btn-success" onClick={e=>this.setState({alertShow:false})}>Analyze Song</button>
              <br />
              <br />
            </form>
            <div className='col-xs-12'>
              <textarea   value={this.props.lyrics} placeholder="Lyrics" id='lyricText' />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <GraphCarousel emotionObject={emotionObject} sentimentObject={sentimentObject}/>
            <TagCloud
              minSize={1}
              maxSize={2}
             tags={emotionCount.concat([])}
              renderer={customRenderer}
              shuffle={false}
              onClick={tag => {emotionWord=tag.value; emotionInstances=tag.count; array = (emotion[tag.value]);this.setState({alertShow:true})}}
            />
            {
               this.state.alertShow&&(
               <div className="alert alert-info" onClick={e=>{this.setState({alertShow:false})}}>
                  <a className="close" aria-label="close">&times;</a>
                  <h4 id='emotText'>{emotionWord[0].toUpperCase()+emotionWord.slice(1)}</h4>
                 <p>Instances: {emotionInstances} </p>
                 <span>Associated Emotions: </span>
                 { array.map((emotion,i)=>(<span key={i}>{emotion + " "}</span>)) }
               </div>
              )
            }
          </div>
        </div>
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




















