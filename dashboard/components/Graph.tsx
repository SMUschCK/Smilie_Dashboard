import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useData } from '../context/dataImport';

const Graph1: React.FC = () => {
    const { forecastData } = useData();
  
    return (
      <View >
        {forecastData ? (
          <View>
            <Text >Weather Forecast</Text>
            <Text >Timezone: {forecastData.hourly_units.direct_radiation}</Text>
            {/* Display other relevant data here */}
          </View>
        ) : (
          <Text >Loading...</Text>
        )}
      </View>
    );
  };

  
  export default Graph1;

  