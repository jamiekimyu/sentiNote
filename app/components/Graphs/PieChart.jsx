import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
 
export default function PieChart ({sentimentObject, emotionObject}) {
    //console.log('I GOT THE PROPS',sentimentObject, emotionObject); 

    return (
      <VictoryPie
        data={[
          {month: "September", profit: 35000, loss: 2000},
          {month: "October", profit: 42000, loss: 8000},
          {month: "November", profit: 55000, loss: 5000}
        ]}
        x="month"
        y={(datum) => datum.profit - datum.loss}
        style={{
          data: {fill: (d) => d.y > 0 ? "red" : "blue"},
          labels: {fontSize: 12},
          parent: {border: "1px solid #ccc"}
        }}
      />
    );

}
