import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryStack, VictoryChart, VictoryPortal, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
 
export default function BarGraph ({sentimentObject}) {
console.log('I GOT THE PROPS',sentimentObject); 

//example sentimentObject: {score: 3, comparative: 3, negative: , positive, }
const dataRange = (sentimentObj) => {
  let sentimentArray = [];
  let score = sentimentObj.score;
  let positiveWordAmount = sentimentObj.positive.length;
  let negativeWordAmount = sentimentObj.negative.length

  sentimentArray.push({sentiment: "Positive", score: positiveWordAmount })
  sentimentArray.push({sentiment: "Negative", score: -negativeWordAmount })
  sentimentArray.push({sentiment: "Overall", score: positiveWordAmount-negativeWordAmount })

  return sentimentArray
};

        
  return (
    <VictoryChart domainPadding={40}>
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
        <VictoryAxis/>
    </VictoryChart>
  );

}