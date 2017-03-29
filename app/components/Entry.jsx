import React, {Component} from 'react';
import sentiment from 'sentiment'
import { TagCloud } from "react-tagcloud";
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import { customRenderer, emotinator, sentiMentator, bayesinator } from "../utils";
let teach, emotionWord, emotionInstances, array= [], emotion = require('../emotion')
import GraphCarousel from './Graphs';


class Entry extends Component {

  constructor(props) {
    super(props)
    this.state = { alertShow:false }
  }

  render(){
    let {submitting, user, title, date, teachEmotion, content, teachDocs} = this.props
    let [smartObject,sentenceArray] = bayesinator(teachDocs, content)
    teach = teachEmotion

      if(content){
        var [emotionObject, emotionCount] = emotinator(content);
        var sentimentObject = sentiMentator( sentiment(content),'journal');
      }

    return (
      <div>
        <div className='well'>
          <div className='row maxW1000'>
               <h1 className='title inline entryHeading'>Assess Your Emotions</h1>
               <p className='text-primary entryHeading'>...and make SentiMentum smarter. Your emotional assessments will directly, and immediately be processed through the Naive Bayes machine learning algorithm. The data will instantly be represented on the Naive Bayes Pie Chart Below, and persist in the database for all users. </p>
          </div>
          
          <div className="row center topBot50">
               <h4 >{title} <small>from {date}</small></h4>
          </div>
          
          <div className="row narrow top-margin50">
            <ButtonToolbar>{sentenceArray.map(renderDropdownButton)}</ButtonToolbar>
          </div>
        </div>
        
            {
              content&&(
                <div>
                  <div className='row center'>
                    <GraphCarousel emotionObject={emotionObject} sentimentObject={sentimentObject} smartObject={smartObject}/>
                  </div>
                  <div className='row center'>
                    <TagCloud minSize={1} maxSize={2} tags={emotionCount.concat([])} renderer={customRenderer} shuffle={false} onClick={tag => {emotionWord=tag.value;emotionInstances=tag.count;array = (emotion[tag.value]);this.setState({alertShow:true})}}/>
                  </div>
                  <div class='row center'>
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
              )
            }
   
     
      </div>
    )
  }
}

export default Entry;

let currentClass;
let classyCycle = function(i){
  let classes=['success','warning','primary','info', 'danger']
  if(!currentClass ){
    currentClass = 'success'
  }else {
    let idx = classes.indexOf(currentClass)
    if(idx === classes.length-1){
      currentClass = 'success'
    }else {
      currentClass = classes[idx+1]
    }
   }
   return currentClass
}

const EMOTIONS = ['anticipation', 'fear', 'joy', 'sadness', 'surprise', 'anger', 'disgust', 'trust']

function renderDropdownButton(title, i) {
  return (
    <div className='dropDown'>
      <DropdownButton bsStyle={classyCycle(i)} className='maxW btn-xs' title={title} key={i} id={`split-button-basic-${i}`}>
        {EMOTIONS.map((emotion,i)=>(
           <MenuItem key={i} eventKey={i} onClick={i=>teach(title, emotion)}>{emotion}</MenuItem>
        ))}
      </DropdownButton>
    </div>
  );
}

