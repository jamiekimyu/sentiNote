/*import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryStack, VictoryChart, VictoryPortal, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
 
export default function BarGraph ({sentimentObject}) {

    //example sentimentObject: {score: 3, comparative: 3, negative: , positive, }
    const dataRange = (sentimentObj) => {
      const sentimentArray = [];
      const positiveWordScore = sentimentObj.totalPositive;
      const negativeWordScore = sentimentObj.totalNegative;

      sentimentArray.push({sentiment: "Positive", score: positiveWordScore });
      sentimentArray.push({sentiment: "Negative", score: negativeWordScore });
      sentimentArray.push({sentiment: "Overall", score: sentimentObj.score });

      return sentimentArray;
    };
        
  return (
    <VictoryChart domainPadding={40} theme={VictoryTheme.material}>
        <VictoryBar
            data={dataRange(sentimentObject)}
            x="sentiment"
            y={(datum) => datum.score}
            style={{
            data: { 
                width: 30,
                fill: (data) => {
                    if(data.score >= 0) return "green"
                    else return "red"
                }
            },
            labels: { padding: -20 }
            }}
            labelComponent={
                <VictoryPortal>
                <VictoryLabel/>
                </VictoryPortal>
            }
        />
    </VictoryChart>
  );

};*/
//Above is Victory

//Below is ReCharts
import React, { Component } from 'react';
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function SimpleBarChart({sentimentObject}) {

    const dataRange = (sentimentObj) => {
        let sentimentArray = [];

        if(sentimentObj.totalPositive) sentimentArray.push({sentiment: "Positive", score: sentimentObj.totalPositive });
        if(sentimentObj.totalNegative) sentimentArray.push({sentiment: "Negative", score: sentimentObj.totalNegative });
        if(sentimentObj.score) sentimentArray.push({sentiment: "Overall", score: sentimentObj.score });

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
