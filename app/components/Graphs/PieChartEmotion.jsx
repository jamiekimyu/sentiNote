import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryTheme } from 'victory';

export default function PieChartEmotion ({emotionObject}) {

  //example emotionObject: {anticipation: 3, joy: 3, positive: 3, trust: 3}
  const dataRange = (emotionObject) => {
    let emotionArray = [];
    for(var emotion in emotionObject){
      if(emotion !== "positive" && emotion !== "negative"){
        emotionArray.push({emotion: emotion, intensity: emotionObject[emotion]});
      };
    };
    return emotionArray;
  };

  return (
    <VictoryPie
      data={dataRange(emotionObject)}
      x="emotion"
      y="intensity"
      style={{
        data: {
          fill: (data) => {
            if(data.x === "anger"){
              return "red"
            } else if(data.x === "anticipation"){
              return "#FD4675"
            } else if(data.x === "disgust"){
              return "#287C52"
            } else if(data.x === "fear"){
              return "#3D3532"
            } else if(data.x === "joy"){
              return "#FFBC0B"
            } else if(data.x === "sadness"){
              return "#3DA6AB"
            } else if(data.x === "surprise"){
              return "#FCC530"
            } else if(data.x === "trust"){
              return "#47C5DA"
            } else {
              return "white"
            }
          }
        },
        labels: {
          fontSize: 12,
          fill:  'silver'
        }
      }}
    />
  );

};
