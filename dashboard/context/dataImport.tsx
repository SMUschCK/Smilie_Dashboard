import React, { createContext, useContext, useEffect, useState , ReactNode } from 'react';

interface ForecastData {
  forEach(arg0: (element: any) => void): unknown;
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
    time:string[];
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
    startDate: Date | null;
    endDate: Date | null;
    aggregate: number | 0;
  };

interface DataContextProps {
    forecastData: ForecastData | null;
    fetchForecastData: () => void;
};

// Retrieves an array of indices that falls outside the time specified on display page
function getIndex (startDate: Date, endDate: Date, dataParent: ForecastData, type: string): number[] {
  let data: string[] = [];

  if (type === 'hourly') {
    data = dataParent.hourly.time;
  } else {
    data = dataParent.daily.time;
    data = data.map(date=> `${date}T23:00`);
  }

  let returnData: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (new Date(data[i]) < startDate || new Date(data[i]) > endDate) {
      returnData.push(i);
    }
  }

  return returnData;
};
// Removes elements under hourly and daily where the array of indices have specified 
const removeItemsByIndexes = (dataParent: ForecastData, Hourly_indexesToRemove: number[],  Daily_indexesToRemove: number[]):ForecastData  => {
  Hourly_indexesToRemove.reverse().forEach((index) => {
    dataParent.hourly.time.splice(index, 1);
    dataParent.hourly.relativehumidity_2m.splice(index, 1);
    dataParent.hourly.direct_radiation.splice(index, 1);
  });

  Daily_indexesToRemove.reverse().forEach((index) => {
    dataParent.daily.time.splice(index, 1);
    dataParent.daily.temperature_2m_max.splice(index, 1);
    dataParent.daily.temperature_2m_min.splice(index, 1);
  });
  return dataParent;
};


const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ startDate, endDate, aggregate, children }) => {
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
        // Filter Date 
        try{
          let hourlyIndex = getIndex(startDate, endDate, data, 'hourly');
          let dailyIndex = getIndex(startDate, endDate, data, 'daily');
        
          const finalData = removeItemsByIndexes(data, hourlyIndex, dailyIndex);
          setForecastData(finalData);
        }catch(error){
          console.error('Error with filtering json data to start and end dates', error);
        }
        console.log(forecastData);

        // Aggregating hourly data

          try {
            // forecastData.aggregate = calculateAggregate(forecastData, aggregate);
            setForecastData(forecastData.aggregate = calculateAggregate(forecastData, aggregate));
            console.log(forecastData);
          } catch (error) {
            console.error("Could not aggregate data, please check dataImport.tsx", error);
          }
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
  
    useEffect(() => {
      fetchForecastData();
    }, [startDate, endDate, aggregate]);

    const childrenArray = React.Children.toArray(children);

    return (
      <DataContext.Provider value={{ forecastData, fetchForecastData }} >
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
