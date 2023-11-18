import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native'
import { useData } from '../context/dataImport';
// import { BarChart, Grid } from 'react-native-responsive-linechart'
import {BarChart} from 'react-native-chart-kit';

const HumidityGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const barChartData = forecastData ? forecastData.hourly.relativehumidity_2m : [];
    const labels = forecastData ? forecastData.hourly.time : [];

    const data = {
        labels: labels,
        dataset: [{data: barChartData}]
    };
    console.log(data);
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
      <View>
        {forecastData ? (
            <BarChart 
                style={{
                  alignItems: 'center',
                  padding: 20,
                  }}            
                data={data}
                width={80}
                height={220}
                yAxisLabel={forecastData.hourly_units.relativehumidity_2m}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                />
        ) : (
          <Text>Loading...</Text>
         )} 
      </View>
    );

  };
  
  export default HumidityGraph;