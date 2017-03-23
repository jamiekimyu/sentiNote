import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryTheme } from 'victory';

export default function PieChartPolarity ({sentimentObject}) {

  const dataRange = (sentimentObj) => {
    let sentimentArray = [];


    if(sentimentObj.totalPositive>0) sentimentArray.push({sentiment: "Pos", score: sentimentObj.totalPositive });
    if(sentimentObj.totalNegative<0) sentimentArray.push({sentiment: "Neg", score: Math.abs(sentimentObj.totalNegative) });

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
