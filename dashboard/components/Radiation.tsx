import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryArea , VictoryChart} from 'victory';

const RadiationGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const radiation: number[] = forecastData ? forecastData.hourly.direct_radiation : [];
    const timeData: string[] = forecastData ? forecastData.hourly.time : [];

    const data = timeData.map((timeData, index) => ({
      timeData,
      radiation: radiation[index]
    }));


    return (
        <View>
          {forecastData ? (
            <VictoryChart>
                <VictoryArea
                data={data}
                style={{ data: { fill: "#c43a31" } }}
                y = "radiation"/>
            </VictoryChart>
          ) : (
            <Text >Data not found...</Text>
          )}
        </View>
      );

  };
  
  export default RadiationGraph;