import React, { Component } from 'react';
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

};