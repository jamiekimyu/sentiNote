//CONSTANTS
const SET_TRANSCRIPT = 'SET_TRANSCRIPT';

//ACTION CREATORS
export const setTranscript = (text) => ({
  type: SET_TRANSCRIPT,
  transcript: text,
});

export const onChangePostText = (text) => ((dispatch) => dispatch(setTranscript(text)))

//REDUCER
const transcriptionReducer = (state = '', action) => {

  switch(action.type) {
    case SET_TRANSCRIPT:
      return action.transcript;
      break;

    default:
      return state;
  }

};

export default transcriptionReducer;
