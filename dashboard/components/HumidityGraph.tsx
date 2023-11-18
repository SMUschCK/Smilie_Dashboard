import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryBar } from 'victory';

const HumidityGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const barChartData: number[] = forecastData ? forecastData.hourly.relativehumidity_2m : [];
    const timeData: string[] = forecastData ? forecastData.hourly.time : [];
    console.log(barChartData)

    const data = timeData.map((timeData, index) => ({
      timeData,
      barChartData: barChartData[index]
    }));
    console.log(data);

    return (
        <View>
          {forecastData ? (
            <VictoryBar
              data={data}
              x="timeData"
              y="barChartData"/>
          ) : (
            <Text >Data not found...</Text>
          )}
        </View>
      );

  };
  
  export default HumidityGraph;