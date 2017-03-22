/*import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

export default function LineGraph ({sentimentObject, sentimentArray}) {
    console.log('sentimentArray', sentimentArray)

    //data is in the sentimentArray: {NumberofWords: tokens.length, Polarity: score, currentWord: tokens[tokens.length-1]}
    return(
    <VictoryChart containerComponent={<VictoryVoronoiContainer/>} theme={VictoryTheme.material}>
        <VictoryLine
            data={sentimentArray} 
            x="NumberofWords"
            y={(datum) => datum.totalScore}
            labelComponent={<VictoryTooltip/>}
            labels={(data) => data.currentWord}
        />
    </VictoryChart>
    );
};*/
//Above is Victory Charts

//Below is ReCharts
import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function SimpleLineChart({sentimentObject}) {
    console.log('sentiment object', sentimentObject)

    const dataRange = (sentimentObj) => {
        let sentimentArray = [];

        const words = sentimentObject.orderedWordsRating
        words.forEach( word => {
            sentimentArray.push({ currentWord: word.word, Polarity: word.totalScore, })
        })

        return sentimentArray;
    };


  	return (
    	<LineChart width={600} height={300} data={dataRange(sentimentObject)}
            margin={{top: 5, right: 30, left: 20, bottom: 30}}>
       <XAxis dataKey="currentWord"/>
       <YAxis dataKey="Polarity"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="Polarity" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    );
};
