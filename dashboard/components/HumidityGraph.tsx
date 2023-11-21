import React, {Component} from 'react';
import {AppRegistry, Image, Text, View, StyleSheet} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryBar, VictoryChart, VictoryTheme , VictoryAxis} from 'victory-native';
import catSky from '../assets/catAtSky.gif';
// import {useTailwind} from 'tailwind-rn';


const HumidityGraph: React.FC = () => {
    // const tailwind = useTailwind();
    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const barChartData: number[] = forecastData ? forecastData.hourly.relativehumidity_2m : [];
    const timeData: string[] = forecastData ? forecastData.hourly.time : [];
    const humidityUnits: string = forecastData ? forecastData.hourly_units.relativehumidity_2m :"";
    const tickValues: Date[] = timeData.map(dateString => new Date(dateString));

    const tickFor = tickValues.map((tickValue) => {
      let hours = tickValue.getHours();
      let date = tickValue.getDate();
      return hours === 12 ?  `${date}|12pm` : '';
    });

    const data = timeData.map((timeData, index) => ({
      timeData: timeData,
      barChartData: barChartData[index]
    }));

    return (
        <View >
          <View>
            <Text className='text-lg'>Column Chart for Relative Humidity {humidityUnits}</Text>
          </View>
          {forecastData ? (
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryAxis 
                    scale="time"
                    standalone={false}
                    style={styles.axisYears}
                    tickValues={tickValues}
                    tickFormat={tickFor}
                  />
              <VictoryAxis dependentAxis
                    offsetX={50}
                    orientation="left"
                    standalone={false}
                  />
              <VictoryBar
                data={data}
                x="timeData"
                y="barChartData"/>
            </VictoryChart>
          ) : (
            <View>
            <Image source={catSky} />
            <Text>Data not found...</Text>
            </View>
          )}
        </View>
      );

  };
  const styles = StyleSheet.create({
    tickLabels: {
      fill: "black",
      fontFamily: "inherit",
      fontSize: 16
    },
    axisYears: {
      axis: { stroke: "black", strokeWidth: 1},
      ticks: {
        stroke: "black",
        strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  export default HumidityGraph;