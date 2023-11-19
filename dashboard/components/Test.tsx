import React from 'react';
import { View, Text } from 'react-native';
import { useData } from '../context/TestDataImport';


const Test: React.FC = () => {
  const { forecastData } = useData();
  const timeData: string[] = forecastData ? forecastData.daily.time : [];
  const temperature: number[] = forecastData ? forecastData.daily.temperature_2m_max : [];



  // console.log(date1)
  return(
    <view>
      {forecastData ? (
                <View>
                  <Text >Weather Forecast</Text>
                  <Text >Timings: {timeData}</Text>
                  <Text >Timings: {temperature}</Text>
                  {/* Display other relevant data here */}
                </View>
              ) : (
                <Text >Loading...</Text>
              )}
    </view>

  );

};
export default Test;
