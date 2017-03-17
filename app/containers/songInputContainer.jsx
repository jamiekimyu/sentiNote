import SongInput from '../components/SongInput';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {fetchSong} from '../reducers/song'  ////
import sentiment from 'sentiment'



let song_title, song_artist, lyrics
const mapstate = (state) => {
	song_title =  state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_title ? state.form.songForm.values.song_title : '' : '' : ''
  song_artist =   state.form.songForm ? state.form.songForm.values ? state.form.songForm.values.song_artist ? state.form.songForm.values.song_artist : '' : '' : ''
  lyrics = state.songs.currentSongLyrics || ''
  return {
    song_title,
    song_artist,
    lyrics
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     analyzeSong (e) {
      console.log('tt',song_title, 'art',song_artist)
      e.preventDefault()
      dispatch(fetchSong({song_title,song_artist}))
    }
  }
}

const SongForm = reduxForm({
  form: 'songForm',
  validate
})(SongInput)

export default connect(mapstate, mapDisptachToProps)(SongForm);


 let validate = function (values) {
  const error = {}
  if (!values.song_title) {
    error.song_title = 'A Song Title is Required'
  }
  if (!values.song_artist) {
    error.song_artist = 'Artist is  Required'
  }
  console.log('Errors======>', error)
  return error
}