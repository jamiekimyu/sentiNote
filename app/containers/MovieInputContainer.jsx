import MovieInput from '../components/MovieInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {fetchCurrentScript} from '../reducers/movie' 
import sentiment from 'sentiment'
import { emotinator, validateSong, sentiMentatorSong } from "../utils";


const mapstate = (state) => {
  let movieArray = state.movies.linksAndTitles
  let currentScript = state.movies.currentMovieScript
  let emotionReturn = emotinator(currentScript)
  let sentimentObject = sentiment(currentScript)
  let {posWithVals, negsWithVals, orderedWordsRating} = sentiMentatorSong(sentimentObject)
  let totalPositive = posWithVals.reduce((a,b)=>a+b[1],0)
  let totalNegative = negsWithVals.reduce((a,b)=>a+b[1],0)
  sentimentObject = Object.assign({},sentimentObject,{posWithVals,negsWithVals,orderedWordsRating,totalPositive,totalNegative})
  let [emotionObject, emotionCount] = emotionReturn

  return {
    movieArray,
    sentimentObject,
    emotionObject,
    emotionCount,
    currentScript,
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     analyzeMovieScript (e) {
      e.preventDefault()
      return dispatch(fetchCurrentScript(e.target.movieScript.value))
    }
  }
}



export default connect(mapstate, mapDisptachToProps)(MovieInput);


