import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useData } from '../context/dataImport';

const Test: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [80000, 48000, 28000, 13000, 5000],
        colors: [
          () => '#94D6E9',
          () => '#ABC2AD',
          () => '#C89297',
          () => '#8F90B0',
          () => '#F2C298',
        ],
        strokeWidth: 1,
      },
    ],
  };

  console.log(data);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View>
      <BarChart
        style={{
          alignItems: 'center',
          padding: 20,
        }}
        data={data}
        width={300}
        height={300}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 'white',
          decimalPlaces: 0,

          strokeWidth: 1,
          barPercentage: 1,
          propsForBackgroundLines: {
            strokeDasharray: '',
            strokeWidth: 1,
          },
          fillShadowGradientOpacity: 3,
          useShadowColorFromDataset: false,
          propsForVerticalLabels: {
            fontSize: 13,
            fontWeight: '400',
            marginLeft: 0,
            paddingLeft: 0,
            textAlign: 'left',
          },
          propsForHorizontalLabels: { fontSize: 13, fontWeight: '400' },
        }}
        withCustomBarColorFromData={true}
        flatColor={true}
        withVerticalLabels={false}
        showBarTops={false}
        fromZero={true}
        withHorizontalLines={true}
        withVerticalLines={true}
        withInnerLines={true}
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default Test;
