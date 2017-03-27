import React, {Component} from 'react';
import sentiment from 'sentiment'
import { TagCloud } from "react-tagcloud";
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap'
import { customRenderer, emotinator, sentiMentator } from "../utils";
let teach, emotionWord, emotionInstances, array= [], emotion = require('../emotion')
import GraphCarousel from './Graphs';


class Entry extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
  }

  render(){
    let {submitting, user, sentenceArray, title, teachEmotion, content, smartObject} = this.props
    teach = teachEmotion

      if(content){
        var [emotionObject, emotionCount] = emotinator(content);
        var sentimentObject = sentiMentator( sentiment(content),'journal');
      }

    return (
      <div className='container'>
        <div className="row title">
             <h1 id='journalHeader'>Journal Entry</h1>
        </div>
        <div className="row title">
             <h2 id='journalHeader'>{title}</h2>
        </div>
        <div className="row row-centered">
          <ButtonToolbar>{sentenceArray.map(renderDropdownButton)}</ButtonToolbar>
        </div>
         <div className="col-xs-12 col-lg-6">
            {
              content&&(
                <div>
                <GraphCarousel emotionObject={emotionObject} sentimentObject={sentimentObject} smartObject={smartObject}/>
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


  




