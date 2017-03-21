import React from 'react';



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

//Twitter Util Functions
/* tweetsToParagraph takes an array of twitter objects and returns
 * the text of the tweets as one block of text
*/
export const tweetsToParagraph = (tweetsData) => {
	let tweetsParagraph = '';
	tweetsData.forEach((tweetData) => {
		tweetsParagraph += tweetData.text + ' ';
	});
	return tweetsParagraph;
};

/* takes an array of twitter objects and pulls off several fields of interest
 * and returns an array of condensed twitter objects.
*/
export const parseTweets = (tweetsData) => {
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
