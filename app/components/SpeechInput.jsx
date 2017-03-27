import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setTranscript } from '../reducers/transcription';

const mapDispatchToProps = (dispatch) => ({
  setTranscript: (text) => {
    dispatch(setTranscript(text));
  }
});

const mapStateToProps = (state) => ({
  transcription: state.transcription
});



const SpeechInput = ({transcription, setTranscript}) => {
console.log('transcription', transcription)
    //initializes speech recognition object
    if (!'webkitSpeechRecognition' in window){
    upgrade();
    } else {
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-IN';
    }    
    
    //toggling function 
    const toggle = (listeningOn) => {

        let holder = document.getElementById('result');

        if (!listeningOn) {
        console.log('got to off', listeningOn);
        speechRecognizer.stop();
        return;

        } else if (listeningOn) {
        console.log('toggling on')
        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
            var interimTranscripts = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
            let transcript = event.results[i][0].transcript;
            transcript.replace("\n", "<br>");
            if(event.results[i].isFinal){
                finalTranscripts += transcript;
            } else {
                interimTranscripts += transcript;
            }
            }
            holder.innerHTML = finalTranscripts + interimTranscripts;
            setTranscript(transcription + finalTranscripts + interimTranscripts)
        };

        }
    };

  let listening = false;
  return (
    <div>
      <h4>Click on the microphone and begin speaking</h4>
        <button className="btn btn-primary" onClick={() => {
          listening = !listening;
          toggle(listening);
        }}>
          <span className="glyphicon glyphicon-microphone"></span>
        </button>
        <div id="result"></div>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(SpeechInput);
