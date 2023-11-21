import React, {Component} from 'react';
import {AppRegistry, Image, View, Text, StyleSheet} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryArea , VictoryChart, VictoryTheme, VictoryAxis,VictoryLabel} from 'victory-native';
import catSky from '../assets/catAtSky.gif';

const RadiationGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the Area Chart
    const radiation: number[] = forecastData ? forecastData.hourly.direct_radiation : [];
    const timeData: string[] = forecastData ? forecastData.hourly.time : [];
    const radiationUnits: string = forecastData ? forecastData.hourly_units.direct_radiation :"";
    const tickValues: Date[] = timeData.map(dateString => new Date(dateString));

    const tickFor = tickValues.map((tickValue) => {
      let hours = tickValue.getHours();
      let date = tickValue.getDate();
      return hours === 12 ?  `${date}|12pm` : '';
    });
    
    const data = tickValues.map((tickValue, index) => ({
      date: tickValue,
      radiation: radiation[index]
    }));

    return (
        <View>
          <View>
            <Text className='text-lg'>Area Chart for Direct Radiation {radiationUnits}</Text>
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
                <VictoryArea
                  data={data}
                  style={{ data: { fill: "#c43a31" } }}
                  y = "radiation"
                  x="date"/>
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
  export default RadiationGraph;