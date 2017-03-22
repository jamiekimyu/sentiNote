import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryTheme } from 'victory';
 
export default function PieChartPolarity ({sentimentObject}) {

  const dataRange = (sentimentObj) => {
    let sentimentArray = [];
    let positiveWordAmount = sentimentObj.positive.length;
    let negativeWordAmount = sentimentObj.negative.length;

    if(sentimentObj.positive.length) sentimentArray.push({sentiment: "Positive", score: positiveWordAmount });
    if(sentimentObj.negative.length) sentimentArray.push({sentiment: "Negative", score: negativeWordAmount });

    return sentimentArray;
  };

  return (
    <VictoryPie
      data={dataRange(sentimentObject)}
      x="sentiment"
      y="score"
      style={{
        data: {
          fill: (data) => {
            if(data.x === "Positive"){
              return "green"
            } else if(data.x === "Negative"){
              return "red"
            }
          }
        }
      }}
    />
  );

};
