import SongInput from '../components/SongInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {fetchSong} from '../reducers/song' 
import sentiment from 'sentiment'
import { emotinator, validateSong, sentiMentator, bayesinator } from "../utils";

let song_title, song_artist, lyrics
const ERRORSTRING = "Sorry, We don't have lyrics for this song yet."

const mapstate = (state) => {
	song_title =  state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_title ? state.form.songForm.values.song_title : '' : '' : ''
  song_artist =   state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_artist ? state.form.songForm.values.song_artist : '' : '' : ''
  lyrics = state.songs.currentSongLyrics || ''
  let emotionReturn = emotinator(lyrics)
  let emotionObject = lyrics === ERRORSTRING ? {} : emotionReturn[0]
  let emotionCount = lyrics === ERRORSTRING ? [] : emotionReturn[1]
  let sentimentObject = lyrics === ERRORSTRING ? {} : sentiMentator(sentiment(lyrics))
  let teachDocs = state.teachDoc.allTeachDocs
  let [smartObject] = bayesinator(teachDocs, lyrics)

  return {
    song_title,
    song_artist,
    lyrics,
    sentimentObject,
    emotionObject,
    emotionCount,
    smartObject
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


