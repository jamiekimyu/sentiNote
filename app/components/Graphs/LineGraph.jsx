import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

export default function LineGraph ({sentimentObject, sentimentArray}) {
    console.log('sentimentArray', sentimentArray)

    //data is in the sentimentArray: {NumberofWords: tokens.length, totalScore: score, currentWord: tokens[tokens.length-1]}
    return(
    <VictoryChart containerComponent={<VictoryVoronoiContainer/>} theme={VictoryTheme.material}>
        <VictoryLine
            data={sentimentArray} 
            x="NumberofWords"
            y={(datum) => datum.totalScore}
            labelComponent={<VictoryTooltip/>}
            labels={(data) => data.currentWord}
        />
    </VictoryChart>
    );
};

/*import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

export default function LineGraph ({sentimentObject, sentimentArray}) {
    console.log('sentimentArray', sentimentArray)

    //data is in the sentimentArray: {NumberofWords: tokens.length, totalScore: score, currentWord: tokens[tokens.length-1]}
    return(
    <VictoryChart containerComponent={<VictoryVoronoiContainer/>} theme={VictoryTheme.material}>
        <VictoryLine
            data={[
                {month: "September", profit: 35000, loss: 2000},
                {month: "October", profit: 42000, loss: 8000},
                {month: "November", profit: 55000, loss: 5000}
            ]}
            x="month"
            y={(datum) => datum.profit - datum.loss}
        />
    </VictoryChart>
    );
};*/