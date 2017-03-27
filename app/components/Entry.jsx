import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import sentiment from 'sentiment'
import GraphCarousel from './Graphs';
import { TagCloud } from "react-tagcloud";
import { customRenderer, emotinator, sentiMentator } from "../utils";
let emotionWord, emotionInstances, array= [], emotion = require('../emotion')

class Entry extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
  }



  render(){
    let {submitting, handleSubmit, user, content, title, initialValues} = this.props;

    if(content){
      var [emotionObject, emotionCount] = emotinator(content);
      var sentimentObject = sentiMentator( sentiment(content),'journal');
    }

    return (
      <div className='container'>
        <div className="row title">
             <h1 id='journalHeader'>Journal Entry</h1>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <form className='journalForm' >
                <Field name="title" type="text" title={title} className="" component={renderField} id="title" label="Title" />
                <div><Field name="content" type="text" content={content} className="form-control field" component={renderField} id="content" label="Content" /></div>
                <Field name="user" type="hidden"  value={user} component={renderField} />
              </form>
          </div>
          <div className="col-xs-12 col-lg-6">
            {
              content&&(
                <div>
                <GraphCarousel emotionObject={emotionObject} sentimentObject={sentimentObject}/>
                <TagCloud minSize={1} maxSize={2} tags={emotionCount.concat([])} renderer={customRenderer} shuffle={false} onClick={tag => {emotionWord=tag.value;emotionInstances=tag.count;array = (emotion[tag.value]);this.setState({alertShow:true})}}/>

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
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Entry;

const renderField = ({ input, label, title, content, type, meta: {touched, error} }) => {
  return (
  <div className="content">
  {
    label==='Title'&&(
      <div className="">
          <input {...input} placeholder={title} type='text' className="form-control field" id="journalTitle" required readOnly/>
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
 {
    label==='Content'&&(
      <div className="">
          <textarea {...input} placeholder={content} type='textarea' className="form-control field" id="journalContent" required readOnly/>
          {touched && error && <span>{error}</span>}
      </div>
    )
  }
  </div>
)}
