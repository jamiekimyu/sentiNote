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

    
    // const width = sentimentObject.identifier === 'movie' ? 1100 : 600;
    // const right = sentimentObject.identifier === 'movie' ? 180 : 100;
    // const left = sentimentObject.identifier === 'movie' ? 10 : 5;
    // let width = sentimentObject.identity==='twitter' ? 1000 : 1000

  	return (
      	<LineChart width={1000} height={500} data={dataRange(sentimentObject)}
              margin={{top: 100, right: 100, left: 100, bottom: 30}}>
         <XAxis dataKey="currentWord" hide="true"/>
         <YAxis dataKey="Current_Polarity"/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip labelStyle={{color: 'black'}}/>
         <Line type="monotone" dataKey="Current_Polarity" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
    );
};
