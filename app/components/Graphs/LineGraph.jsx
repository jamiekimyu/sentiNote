import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

export default function LineGraph ({}) {

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
            labelComponent={<VictoryTooltip/>}
            labels={(data) => data.profit}
        />
    </VictoryChart>
    );
};