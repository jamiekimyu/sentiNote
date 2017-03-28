import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PieChartEmotion from './Graphs/PieChartEmotion';
import PieChartPolarity from './Graphs/PieChartPolarity';
import BarGraph from './Graphs/BarGraph';
import LineGraph from './Graphs/LineGraph';
import GraphCarousel from './Graphs';
import { TagCloud } from "react-tagcloud";
import { journalRenderField, customRenderer, emotinator } from "../utils";
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')

class JournalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {alertShow:false};
  }

  render(){
    let {submitting, sentimentObject, emotionObject, handleSubmit, addEntry, user, emotionCount, smartObject} = this.props
    return (
      <div className='container'>
        <div className="row title">
          <h1 id='journalHeader'>Journal</h1>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <form className='journalForm' onSubmit={addEntry}>
              <Field name="title" type="text" className="" component={journalRenderField} id="title" label="Title" />
              <button type="submit" disabled={submitting} className="btn btn-success" id='journalSubmit'>Add This Entry to My Journal and Clear Graphs</button>
              <div><Field name="content" type="text" className="form-control field" component={journalRenderField} id="content" label="Content" /></div>
              <Field name="user" type="hidden"  value={user} component={journalRenderField} />
            </form>
          </div>

          <div className="col-xs-12 col-lg-6">
        <div className="row row-centered">
          <div>
            <GraphCarousel sentimentObject={sentimentObject} emotionObject={emotionObject} smartObject={smartObject} />
          </div>
        </div>
            <TagCloud minSize={1} maxSize={2} tags={emotionCount.concat([])} renderer={customRenderer} shuffle={false} onClick={tag => {emotionWord=tag.value;emotionInstances=tag.count; array = (emotion[tag.value]); this.setState({alertShow:true})}}/>

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
        </div>
      </div>
    );
  };
};

export default JournalInput;


