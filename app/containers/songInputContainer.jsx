import SongInput from '../components/SongInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {fetchSong} from '../reducers/song'  ////
import sentiment from 'sentiment'
import { emotinator, validateSong } from "../utils";


let song_title, song_artist, lyrics, sent, emot 
const ERRORSTRING = "Sorry, We don't have lyrics for this song yet."
const mapstate = (state) => {
	song_title =  state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_title ? state.form.songForm.values.song_title : '' : '' : ''
  song_artist =   state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_artist ? state.form.songForm.values.song_artist : '' : '' : ''
  lyrics = state.songs.currentSongLyrics || ''
  console.log('lyrics',lyrics)
  sent = lyrics === ERRORSTRING ? {} : sentiment(lyrics)
  emot = lyrics === ERRORSTRING ? {} : emotinator(lyrics)
  return {
    song_title,
    song_artist,
    lyrics,
    sent,
    emot
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


