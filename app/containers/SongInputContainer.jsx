import SongInput from '../components/SongInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {fetchSong} from '../reducers/song' 
import sentiment from 'sentiment'
import { emotinator, validateSong, sentiMentatorSong } from "../utils";

let song_title, song_artist, lyrics, sentimentObject, emotionObject, emotionCount, emotionReturn
const ERRORSTRING = "Sorry, We don't have lyrics for this song yet."

const mapstate = (state) => {
	song_title =  state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_title ? state.form.songForm.values.song_title : '' : '' : ''
  song_artist =   state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_artist ? state.form.songForm.values.song_artist : '' : '' : ''
  lyrics = state.songs.currentSongLyrics || ''
  console.log('lyrics',lyrics)

  emotionReturn = emotinator(lyrics)
  sentimentObject = lyrics === ERRORSTRING ? {} : sentiment(lyrics)

  
  let {posWithVals, negsWithVals, orderedWordsRating} = sentiMentatorSong(sentimentObject)
  let totalPositive = posWithVals.reduce((a,b)=>a+b[1],0)
  let totalNegative = negsWithVals.reduce((a,b)=>a+b[1],0)
  sentimentObject = Object.assign({},sentimentObject,{posWithVals,negsWithVals,orderedWordsRating,totalPositive,totalNegative})




  emotionObject = lyrics === ERRORSTRING ? {} : emotionReturn[0]
  emotionCount = lyrics === ERRORSTRING ? [] : emotionReturn[1]
  return {
    song_title,
    song_artist,
    lyrics,
    sentimentObject,
    emotionObject,
    emotionCount
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     analyzeSong (e) {
      e.preventDefault()
      dispatch(fetchSong({song_title,song_artist}))
    }
  }
}

const SongForm = reduxForm({
  form: 'songForm',
  validateSong
})(SongInput)

export default connect(mapstate, mapDisptachToProps)(SongForm);


