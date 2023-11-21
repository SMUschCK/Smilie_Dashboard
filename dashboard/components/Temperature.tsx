import React, {Component} from 'react';
import {AppRegistry, Image, Text, View, StyleSheet} from 'react-native'
import { useData } from '../context/dataImport';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis,VictoryLabel } from 'victory-native';
import CatSky from '../assets/CatAtSky.gif';

const TemperatureGraph: React.FC = () => {

    const { forecastData } = useData();
  
    // Extract relevant data for the BarChart
    const tempMax: number[] = forecastData ? forecastData.daily.temperature_2m_max : [];
    const tempMin: number[] = forecastData ? forecastData.daily.temperature_2m_min : [];
    const timeData: string[] = forecastData ? forecastData.daily.time : [];
    const tempUnits: string = forecastData ? forecastData.daily_units.temperature_2m_min :"";
    const tickValues: Date[] = timeData.map(dateString => new Date(dateString));

    const tickFor = tickValues.map((tickValue) => {
      const dayOfMonth = tickValue.getDate();
      return dayOfMonth === 1 || dayOfMonth % 5 === 0 ? dayOfMonth : '';
    });


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
          <View>
            <Text className='text-lg'>Line Chart for Daily Temperature {tempUnits}</Text>
          </View>
          {forecastData ? (
            <VictoryChart>
                  <VictoryAxis 
                    scale="time"
                    standalone={false}
                    style={styles.axisYears}
                    tickValues={tickValues}
                    tickFormat={tickFor}
                  />
                  <VictoryLabel x={200} y={290}
                    text={"Days of the Month"}
                  />
                  <VictoryAxis dependentAxis
                    offsetX={50}
                    orientation="left"
                    standalone={false}
                  />

                <VictoryLine theme={VictoryTheme.material}
                data={dataMax}
                x="timeData"
                y="tempMax"/>
                <VictoryLine
                data={dataMin}
                x="timeData"
                y="tempMin"/>
            </VictoryChart>
          ) : (
            <View>
              <Image source={CatSky} />
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
  export default TemperatureGraph;