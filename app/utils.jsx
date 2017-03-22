import React from 'react';

export function sentiMentatorSong(sentimentObject) {
  let afinn = require('./AFINN')
  let posWithVals = []
  let negsWithVals = []
  let orderedWordsRating = []
  let totalScore = 0
  
  sentimentObject.positive.forEach(word=>posWithVals.push([ word, afinn[word] ]))
  sentimentObject.negative.forEach(word=>negsWithVals.push([ word, afinn[word] ]))
  sentimentObject.words.forEach(word=>{
    totalScore += afinn[word]
    orderedWordsRating.push(  {word,  totalScore}     )
  })
  return {negsWithVals, posWithVals, orderedWordsRating}
}

export function sentiMentatorJournal(sentimentObject) {
  let afinn = require('./AFINN')
  let posWithVals = []
  let negsWithVals = []
  let orderedWordsRating = []
  let totalScore = 0
  
  sentimentObject.positive.forEach(word=>posWithVals.push([ word, afinn[word] ]))
  sentimentObject.negative.forEach(word=>negsWithVals.push([ word, afinn[word] ]))
  sentimentObject.words.reverse().forEach(word=>{
    totalScore += afinn[word]
    orderedWordsRating.push(  {word,  totalScore}     )
  })
  return {negsWithVals, posWithVals, orderedWordsRating}
}

export function emotinator(content) {
  let wordArray = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')
  let emotionObject = {}
  let preData = {}
  let emotionInstances = []
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
 for(let key in preData) {
    emotionInstances.push({value: key, count: preData[key][1]})
  }
  emotionInstances = emotionInstances.sort((a,b)=> b.count - a.count).slice(0,50)  //sort and return top 50
  return [emotionObject, emotionInstances]
}

export const journalRenderField = ({ input, label, type, meta: {touched, error} }) => {
  return (
  <div className="content">
    {
      label==='Title'&&(
        <div className="">
            <input {...input} placeholder={label} type='text' className="form-control field" id="journalTitle" required/>
            {touched && error && <span>{error}</span>}
        </div>
      )
    }
    {
        label==='Content'&&(
          <div className="">
              <textarea {...input} placeholder={label} type='textarea' className="form-control field" id="journalContent" required/>
              {touched && error && <span>{error}</span>}
          </div>
        )
      }
  </div>
)};

export const customRenderer = (tag, size, color) => (
  <span key={tag.value}
    style={{
      fontSize: `${size+1}em`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: `${color}`
    }}>{tag.value}</span>
);

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


