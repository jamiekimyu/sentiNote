import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
 
export default function PieChart ({sentimentObject, emotionObject}) {
    //console.log('I GOT THE PROPS',sentimentObject, emotionObject); 

//{anticipation: 3, joy: 3, positive: 3, trust: 3}
const dataRange = (emotionObject) => {
  let emotionArray = [];
  for(var emotion in emotionObject){
    emotionArray.push({emotion: emotion, intensity: emotionObject[emotion]})  
  }
  return emotionArray
};

    return (
      <VictoryPie
        data={dataRange(emotionObject)}
        x="emotion"
        y="intensity"
      />
    );

}
