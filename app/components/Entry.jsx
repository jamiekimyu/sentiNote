import React, {Component} from 'react';
import sentiment from 'sentiment'
import GraphCarousel from './Graphs';
import { TagCloud } from "react-tagcloud";
import { customRenderer, emotinator } from "../utils";
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap'
let teach, emotionWord, emotionInstances, array= [], emotion = require('../emotion')


class Entry extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
  }

  render(){
    let {submitting, sentimentObject, emotionObject, user, emotionCount, sentenceArray, title, teachEmotion} = this.props
    teach = teachEmotion

    return (
      <div className='container'>
        <div className="row title">
             <h1 id='journalHeader'>Journal Entry</h1>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <form className='journalForm' >
                <Field name="title" type="text" className="" component={renderField} id="title" label="Title" />
                <div><Field name="content" type="text" className="form-control field" component={renderField} id="content" label="Content" /></div>
                <Field name="user" type="hidden"  value={user} component={renderField} />
              </form>
          </div>
          <div className="col-xs-12 col-lg-6">
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
        </div>
      </div>
    )
  }
}

export default Entry;

const EMOTIONS = ['anticipation', 'fear', 'joy', 'sadness', 'surprise', 'anger', 'disgust', 'trust']
function renderDropdownButton(title, i) {
  return (
    <SplitButton bsStyle='success' title={title} key={i} id={`split-button-basic-${i}`}>
      {EMOTIONS.map((emotion,i)=>(
         <MenuItem key={i} eventKey={i} onClick={i=>teach(title, emotion)}>{emotion}</MenuItem>
      ))}
    </SplitButton>
  );
}


  













