import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function SimpleLineChart({sentimentObject}) {
    const dataRange = (sentimentObj) => {
        let sentimentArray = [];
        const words = sentimentObject.orderedWordsRating
        if(words) words.forEach(
          (word, i) => {
            sentimentArray.push({ currentWord: word.word, Current_Polarity: word.totalScore, })
        })
        return sentimentArray;
    };
    
    const width = sentimentObject.identifier === 'movie' ? 1100 : 600;
    const right = sentimentObject.identifier === 'movie' ? 180 : 100;
    const left = sentimentObject.identifier === 'movie' ? 10 : 5;

  	return (
      	<LineChart width={1100} height={300} data={dataRange(sentimentObject)}
              margin={{top: 5, right: right, left: left, bottom: 30}}>
         <XAxis dataKey="currentWord" hide="true"/>
         <YAxis dataKey="Current_Polarity"/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip labelStyle={{color: 'black'}}/>
         <Line type="monotone" dataKey="Current_Polarity" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
    );
};
