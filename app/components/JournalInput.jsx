import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PieChartEmotion from './Graphs/PieChartEmotion';
import PieChartPolarity from './Graphs/PieChartPolarity';
import BarGraph from './Graphs/BarGraph';
import LineGraph from './Graphs/LineGraph';
import GraphCarousel from './Graphs';
import { TagCloud } from "react-tagcloud";
import { journalRenderField, customRenderer, emotinator, SpeechInputContainer } from "../utils";
let emotionWord, emotionInstances, array= [], emotion = require('../emotion');
import SpeechInput from './SpeechInput';
import {setTranscript, onChangePostText} from '../reducers/transcription';

const mapDispatchToProps = (dispatch) => ({
  onChangePostText: (event) => dispatch(setTranscript(event.target.value))
});

const mapStateToProps = (state) => ({
  transcript: state.transcription
});


class JournalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow:false,
    };
  }

  render(){

    let { onChangePostText, transcript, submitting, sentimentObject, emotionObject, handleSubmit, addEntry, user, emotionCount, smartObject} = this.props

    return (
      <div className='container'>
        <div className="row title">
          <h1 id='journalHeader'>Journal</h1>
        </div>

        <div className="row">
            <form className='journalForm' onSubmit={addEntry}>
              <div>
                <Field name="title" type="text" className="" component={journalRenderField} id="title" label="Title" />
                <SpeechInput className='speech'/>
                <button type="submit" disabled={submitting} className="btn btn-success" id='journalSubmit'>Submit Entry</button>
              </div>
              <div>
                <Field transcript={transcript} onChangePostText={onChangePostText} name="content" type="text" className="form-control field" component={journalRenderField} id="content" label="Content" />
                <Field name="user" type="hidden"  value={user} component={journalRenderField}/>
              </div>
            </form>
        </div>
        
        <div className="row row-centered margTopBot20">
          <GraphCarousel sentimentObject={sentimentObject} emotionObject={emotionObject} smartObject={smartObject} />
        </div>
        
        <div className='row row-centered'>
          <TagCloud minSize={1} maxSize={2} tags={emotionCount.concat([])} renderer={customRenderer} shuffle={false} onClick={tag => {emotionWord=tag.value;emotionInstances=tag.count; array = (emotion[tag.value]); this.setState({alertShow:true})}}/>
        </div>

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
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalInput);


