import React, { Component } from 'react';
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function SimpleBarChart({sentimentObject}) {

    const dataRange = (sentimentObj) => {
        let sentimentArray = [];

        if(sentimentObj.totalPositive) sentimentArray.push({sentiment: "Positive", score: sentimentObj.totalPositive });
        if(sentimentObj.totalNegative) sentimentArray.push({sentiment: "Negative", score: sentimentObj.totalNegative });
        if(sentimentObj.score) sentimentArray.push({sentiment: "Overall", score: sentimentObj.totalPositive + sentimentObj.totalNegative });
        return sentimentArray;
    };
	
  	return (
        <BarChart width={600} height={300} data={dataRange(sentimentObject)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="sentiment"/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <ReferenceLine y={0} stroke='#000'/>
        <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
    );
  
};
