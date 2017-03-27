import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setTranscript } from '../reducers/transcription';

const mapDispatchToProps = (dispatch) => ({
  setTranscript: (text) => {
    dispatch(setTranscript(text));
  },
});

const mapStateToProps = (state) => ({
  transcript: state.transcription.transcript,
});



const SpeechInput = ({transcription, setTranscript}) => {

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
        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
            var interimTranscripts = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
            var transcript = event.results[i][0].transcript;
            transcript.replace("\n", "<br>");
            if(event.results[i].isFinal){
                finalTranscripts += transcript;
            }else{
                interimTranscripts += transcript;
            }
            }
            holder.innerHTML = finalTranscripts + interimTranscripts;
            setTranscript(finalTranscripts + interimTranscripts)
        };

        }
    };

  let listening = false;

  return (
    <div>
      <h4>Click on the microphone and begin speaking</h4>
        <button className="btn btn-start" onClick={() => {
          listening = !listening;
          toggle(listening);
        }}>
          <i className="glyphicons glyphicons-microphone">Start or Stop</i>
        </button>
        <div id="result"></div>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(SpeechInput);
