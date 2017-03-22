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
        }
      }}
    />
  );

};

/*import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts'

export default function SimplePieChart ({sentimentObject, emotionObject}) {
console.log('I GOT THE PROPS',sentimentObject, emotionObject); 

const dataRange = (emotionObj) => {
  const emotionsWithColors = {anger: '#cc0000', anticipation: "#9933cc", disgust: "#287C52", fear: "#424242", joy: "#558000", sadness: "#3DA6AB", surprise: "##ff8800", trust: "#2a9fd6"}
  let emotionArray = [];
  for(var emotion in emotionObj){
    if(emotion !== "positive" && emotion !== "negative"){
      emotionArray.push({name: emotion, value: emotionObj[emotion], color: emotionsWithColors[emotion]})  
    }
  }
  return emotionArray
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
   	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" fontSize="13px" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      	{`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  
//example dummy data
// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const data = dataRange(emotionObject);

  	return (
    	<PieChart width={350} height={350}>
        <Pie
          data={data} 
          cx={150} 
          cy={150} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
          }
        </Pie>
      </PieChart>
    );

}*/