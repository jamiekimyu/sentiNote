import React from 'react';
const afinn = require('./AFINN'), emotion = require('./emotion')

export function sentiMentator(sentimentObject, identifier) {
  let totalScore = 0, posWithVals = [], negsWithVals = [], orderedWordsRating = []
  sentimentObject.words.forEach(word=>{
    let score = afinn[word]
    if(score>0){posWithVals.push([word, score])}
    else{ negsWithVals.push([word, score]) }
  })
  let sentimentArray = identifier === 'journal' ?  sentimentObject.words.reverse() :  sentimentObject.words
  //if the sentimentArray has more than 25 values, takes evenly spaced out nth values in the array so that we get 20 values
  if(sentimentArray.length > 25){
    console.log('hit the if statement to see if more than 25')
    let shorterArray = [];
    let maximumNumberOfValues = 25;
    let delta = Math.floor( sentimentArray.length / maximumNumberOfValues );
    for(let i =0; i<sentimentArray.length;i=i+delta){
      shorterArray.push(sentimentArray[i])
    }
    shorterArray.forEach(word=>{
      totalScore += afinn[word]
      orderedWordsRating.push( {word,totalScore} )
    })
  } else { 
    sentimentArray.forEach(word=>{
      totalScore += afinn[word]
      orderedWordsRating.push( {word,totalScore} )
    })
  }
  let totalPositive = posWithVals.reduce((a,b)=>a+b[1],0)
  let totalNegative = negsWithVals.reduce((a,b)=>a+b[1],0)
  return Object.assign({}, sentimentObject, {negsWithVals, posWithVals, orderedWordsRating, totalPositive, totalNegative}) 
}

export function emotinator(content) {
  let wordArray = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')
  let emotionObject = {}, preData = {}, emotionInstances = []
  wordArray.forEach(word=>{
    if(emotion[word]){
      preData[word] =  preData[word] ? [preData[word][0], preData[word][1]+1] : [emotion[word],1]
      emotion[word].forEach(match=>{
        emotionObject[match] = emotionObject[match] ? emotionObject[match] + 1 : 1
      })
    }
  })

 for(let key in preData) {
    emotionInstances.push({value: key, count: preData[key][1]})
  }
  emotionInstances = emotionInstances.sort((a,b)=> b.count - a.count).slice(0,50)  //sort and return top 50
  return [emotionObject, emotionInstances]
}

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

export const tweetsToParagraph = (tweetsData) => {      //Twitter Util Functions tweetsToParagraph takes an array of twitter objects and returns the text of the tweets as one block of text

	let tweetsParagraph = '';
	tweetsData.forEach((tweetData) => {
		tweetsParagraph += tweetData.text + ' ';
	});
	return tweetsParagraph;
};

export const parseTweets = (tweetsData) => {        // takes an array of twitter objects and pulls off several fields of interest and returns an array of condensed twitter objects.

	const parsedTweets = [];
	tweetsData.forEach((tweetData) => {
		parsedTweets.push(
			{
				id: tweetData.id,
				date: tweetData.created_at,
				text: tweetData.text,
				username: tweetData.user.name,
				screenName: tweetData.user.screen_name,
				userDescription: tweetData.user.description
			}
		);
	});
	return parsedTweets;
};

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
