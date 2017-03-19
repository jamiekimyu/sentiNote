



export function emotinator(content) {
  let wordArray = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')
  let emotionObject = {}
  let preData = {}
  let data = []
  let emotion = require('./emotion')

  wordArray.forEach(word=>{
    if(emotion[word]){
      if(!preData[word]){
        preData[word]=[emotion[word],1]
      }else{
        preData[word][1]=preData[word][1]+1
      }
      emotion[word].forEach(match=>{
        if (!emotionObject[match]) {
          emotionObject[match]=1
        }else{
          emotionObject[match] = emotionObject[match] + 1
        }
      })
    }
  })
  return emotionObject
}

export function validateSong(values) {
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

export function validateJournal(values) {
  const error = {}
  if (!values.title) {
    error.title = 'A Title is Required'
  }
  if (!values.content) {
    error.content = 'Content is Required'
  }
  console.log('Errors======>', error)
  return error
}




    

     

      
    //   for(let key in preData) {
    //     data.push({value: key, count: preData[key][1]})
    //   }
    // console.log('emotion!', emotionObject )