import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PieChartEmotion from './Graphs/PieChartEmotion';
import PieChartPolarity from './Graphs/PieChartPolarity';
import BarGraph from './Graphs/BarGraph';
import LineGraph from './Graphs/LineGraph';
import Footer from './Footer';
import { TagCloud } from "react-tagcloud";
import { customRenderer, emotinator } from "../utils";
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')

class JournalInput extends Component {

  constructor(props) {
    super(props);
    this.state = {alertShow:false};
  }

  render(){
    let {submitting, sentimentObject, emotionObject, handleSubmit, addEntry, user, emotionCount} = this.props
    console.log('sent',sentimentObject)

    return (
      <div className='container'>
        <div className="row title">
          <h1 id='journalHeader'>Journal</h1>
        </div>
        <div className="row row-centered">
          <form className='journalForm' onSubmit={addEntry}>
            <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
            <button type="submit" disabled={submitting} className="btn btn-success" id='journalSubmit'>Add This Entry to My Journal and Clear Graphs</button>
            <div><Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" /></div>
            <Field name="user" type="hidden"  value={user} component={renderField} />
          </form>
        </div>
        <div className="row row-centered">
          <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
            <PieChartEmotion emotionObject={emotionObject} />
          </div>
          <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
            <PieChartPolarity sentimentObject={sentimentObject} />
          </div>
          <div>
            <BarGraph sentimentObject={sentimentObject} />
          </div>
          <div>
            <LineGraph sentimentObject={sentimentObject} />
          </div>
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
    );
  };
};

export default JournalInput;

const renderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
    {
      label==='Title'&&(
        <div className="">
            <input {...input} placeholder={label} type='text' className="form-control field" id="journalTitle" required/>
            {touched && error && <span>{error}</span>}
        </div>
      )
    }
    {
        label==='Content'&&(
          <div className="">
              <textarea {...input} placeholder={label} type='textarea' className="form-control field" id="journalContent" required/>
              {touched && error && <span>{error}</span>}
          </div>
        )
      }
  </div>
)};
