import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryTheme } from 'victory';

export default function PieChartPolarity ({sentimentObject}) {

  const dataRange = (sentimentObj) => {
    let sentimentArray = [];
    let positiveWordAmount = sentimentObj.positive.length;
    let negativeWordAmount = sentimentObj.negative.length;

    if(sentimentObj.positive.length) sentimentArray.push({sentiment: "Pos", score: positiveWordAmount });
    if(sentimentObj.negative.length) sentimentArray.push({sentiment: "Neg", score: negativeWordAmount });

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
            if(data.x === "Pos"){
              return "green"
            } else if(data.x === "Neg"){
              return "red"
            }
          }
        },
        labels: {
          fill: 'silver',
          fontSize: 12
        }
      }}
    />
  );

};
