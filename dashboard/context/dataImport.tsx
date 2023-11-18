import React, { createContext, useContext, useEffect, useState , ReactNode } from 'react';

interface ForecastData {
  // Define the structure of your data based on the API response
  latitude: Number;
  longitude:Number;
  generationtime_ms:Number;
  utc_offset_seconds:Number;
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
interface Props {
    children: ReactNode | ReactNode[];
  }

interface DataContextProps {
    forecastData: ForecastData | null;
    fetchForecastData: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  
    const fetchForecastData = async () => {
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
  
    useEffect(() => {
      fetchForecastData();
    }, []);

    const childrenArray = React.Children.toArray(children);

    return (
      <DataContext.Provider value={{ forecastData, fetchForecastData }}>
        {childrenArray}
      </DataContext.Provider>
    );
  };
  
  export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useData must be used within a DataProvider');
    }
    return context;
  };
