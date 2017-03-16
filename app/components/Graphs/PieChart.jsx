import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryTheme } from 'victory';
 
export default function PieChart ({sentimentObject, emotionObject}) {
//console.log('I GOT THE PROPS',sentimentObject, emotionObject); 

//example emotionObject: {anticipation: 3, joy: 3, positive: 3, trust: 3}
const dataRange = (emotionObject) => {
  let emotionArray = [];
  for(var emotion in emotionObject){
    if(emotion !== "positive" && emotion !== "negative"){
      emotionArray.push({emotion: emotion, intensity: emotionObject[emotion]})  
    }
  }
  return emotionArray
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
                return "pink"
              } else if(data.x === "disgust"){
                return "gray"
              } else if(data.x === "fear"){
                return "black"
              } else if(data.x === "joy"){
                return "yellow"
              } else if(data.x === "sadness"){
                return "violet"
              } else if(data.x === "surprise"){
                return "purple"
              } else if(data.x === "trust"){
                return "orange"
              } else {
                return "white"
              }
            }
          },
        }}
      />
    );

}
