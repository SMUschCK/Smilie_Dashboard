import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

// import { useData } from '../../assets/dataImport';

interface ForecastData {
  // Define the types for the properties of your data object
  // Adjust these types based on the actual structure of your API response
  // For example, if your API response has a property 'exampleProperty' of type string, you can do:
  // exampleProperty: string;
  latitude: number;
  longitude:number;
  generationtime_ms:number;
  utc_offset_seconds:number;
  timezone: string;
  timezone_abbreviation:string;
  elevation: number;
  hourly_units:{
    time:string;
    relativehumidity_2m:string;
    direct_radiation:string;
  };
  
  hourly: {
    time:string;
    relativehumidity_2m: number[];
    direct_radiation: number[];
  };
  daily_units:{
    time: string;
    temperature_2m_max:string;
    temperature_2m_min:string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

const WeatherForecast: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: ForecastData = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {forecastData ? (
        <View>
          <Text style={styles.header}>Weather Forecast</Text>
          <Text style={styles.text}>Timezone: {forecastData.timezone}</Text>
          <Text style={styles.text}>Latitude: {forecastData.hourly.time}</Text>
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

export default WeatherForecast;