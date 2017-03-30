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


class SpeechInput extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
     //initializes speech recognition object when component is mounted onto the DOM(occurs just once)
    if (!'webkitSpeechRecognition' in window){
    upgrade();
    } else {
    this.listening = false;
    this.speechRecognizer = new webkitSpeechRecognition();
    this.speechRecognizer.continuous = true;
    this.speechRecognizer.interimResults = true;
    this.speechRecognizer.lang = 'en-IN';
    }
  }

  componentWillUnmount(){
    this.speechRecognizer.abort();
  }

  render(){
    const {transcription, setTranscript} = this.props;

    //toggling function
    const toggle = (listening) => {

        if (!listening) {
          console.log('got to off', listening);
          this.speechRecognizer.stop();
          this.speechRecognizer.onresult = null;

        } else if (listening) {
          console.log('toggling on')
          this.speechRecognizer.start();

          var finalTranscripts = '';

          this.speechRecognizer.onresult = function(event){
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
              setTranscript(transcription + finalTranscripts + interimTranscripts)
          };

        };
    };

    return (
      <div className="btn btn-primary microphone" onClick={() => {
        this.listening = !this.listening;
        toggle(this.listening);
      }}>
        <img className="glyphicon" src='/android-microphone.png'/>
      </div>    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SpeechInput);
