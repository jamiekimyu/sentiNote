import React from 'react';
import Lexed from "lexed";
const afinn = require('./AFINN'), emotion = require('./emotion');
let BayesClassifier = require('bayes-classifier');
let classifier = new BayesClassifier();

export function sentiMentator(sentimentObject, identifier) {
  let totalScore = 0, posWithVals = [], negsWithVals = [], orderedWordsRating = [];
  sentimentObject.words = sentimentObject.words.filter(word => word !== "");
  sentimentObject.words.forEach(word=>{
    let score = afinn[word];
    if(score>0){posWithVals.push([word, score])}
    else{ negsWithVals.push([word, score]) }
  });
  let sentimentArray = identifier === 'journal' ?  sentimentObject.words.reverse() :  sentimentObject.words;
  sentimentArray.forEach( (word, index) =>{
    totalScore += afinn[word];
    if(sentimentArray.length<75){
      orderedWordsRating.push( {word,totalScore} );
    } else {
      let maximumNumberofValues = 50;
      let delta = Math.floor( sentimentArray.length / maximumNumberofValues );
      if(index===0 || index === sentimentArray.length-1 || index%delta === 0){
        orderedWordsRating.push( {word,totalScore} );
      }
    }
  });
  let totalPositive = posWithVals.reduce((a,b)=>a+b[1],0);
  let totalNegative = negsWithVals.reduce((a,b)=>a+b[1],0);
  return Object.assign({}, sentimentObject, {negsWithVals, posWithVals, orderedWordsRating, totalPositive, totalNegative, identifier});
}

export function emotinator(content) {
  let wordArray = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(' ')
  let emotionObject = {}, preData = {}, emotionInstances = [];
  wordArray.forEach(word=>{
    if(emotion[word]){
      preData[word] =  preData[word] ? [preData[word][0], preData[word][1]+1] : [emotion[word],1]
      emotion[word].forEach(match=>{
        emotionObject[match] = emotionObject[match] ? emotionObject[match] + 1 : 1
      })
    }
  });

 for(let key in preData) {
    emotionInstances.push({value: key, count: preData[key][1]});
  };
  emotionInstances = emotionInstances.sort((a,b)=> b.count - a.count).slice(0,50);  //sort and return top 50
  return [emotionObject, emotionInstances];
};

export function bayesinator(teachDocs, content) {
  let smartObject = {}
  let sentenceArray = new Lexed(content).sentenceLevel()  
  teachDocs.forEach(teachDoc=>{
    for(let key in teachDoc){
      if(Array.isArray(teachDoc[key])&&teachDoc[key].length){
        classifier.addDocuments(teachDoc[key], key)
      }
    }
  })
  classifier.train()
  sentenceArray.forEach(sentence=>{
    let arrayOfEmotions = classifier.getClassifications(sentence)
    arrayOfEmotions.forEach(obj=>{
      if(smartObject[obj.label]){
        smartObject[obj.label] = smartObject[obj.label] + obj.value
      }else {
        smartObject[obj.label] = obj.value
      }
    })
  })
  return [smartObject, sentenceArray]
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
  const error = {};
  if (!values.song_title) {
    error.song_title = 'A Song Title is Required';
  };
  if (!values.song_artist) {
    error.song_artist = 'Artist is  Required';
  };
  console.log('Errors======>', error)
  return error;
};

export function validateJournal(values) {
  const error = {};
  if (!values.title) {
    error.title = 'A Title is Required';
  };
  if (!values.content) {
    error.content = 'Content is Required';
  };
  console.log('Errors======>', error);
  return error;
};

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

export const journalRenderField = ({ onChangePostText, transcript, input, label, type, meta: {touched, error} }) => {
  // console.log('got onChangePostText', onChangePostText)
  // console.log('got transcript', transcript)

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
              <textarea {...input} value={transcript} onChange={onChangePostText} placeholder={label} type='textarea' className="form-control field" id="journalContent" required/>
              {touched && error && <span>{error}</span>}
          </div>
        )
      }
  </div>
)};