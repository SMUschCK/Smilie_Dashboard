import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryChart, VictoryLine } from 'victory';

const TemperatureGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const tempMax: number[] = forecastData ? forecastData.daily.temperature_2m_max : [];
    const tempMin: number[] = forecastData ? forecastData.daily.temperature_2m_min : [];
    const timeData: string[] = forecastData ? forecastData.daily.time : [];

    const dataMax = timeData.map((timeData, index) => ({
      timeData,
      tempMax: tempMax[index]
    }));
    const dataMin = timeData.map((timeData, index) => ({
        timeData,
        tempMin: tempMin[index]
      }));

    return (
        <View>
          {forecastData ? (
            <VictoryChart>
                <VictoryLine
                data={dataMax}
                x="timeData"
                y="tempMax"/>
                <VictoryLine
                data={dataMin}
                x="timeData"
                y="tempMin"/>
            </VictoryChart>
          ) : (
            <Text >Data not found...</Text>
          )}
        </View>
      );

  };
  
  export default TemperatureGraph;