import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useData } from '../context/dataImport';

const Graph1: React.FC = () => {
    const { forecastData } = useData();
  
    return (
      <View style={styles.container}>
        {forecastData ? (
          <View>
            <Text style={styles.header}>Weather Forecast</Text>
            <Text style={styles.text}>Timezone: {forecastData.hourly_units.direct_radiation}</Text>
            {/* Display other relevant data here */}
          </View>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
    },
  });
  
  export default Graph1;