import React, {useState} from 'react';
import {ScrollView, Button, Text, View , SafeAreaView} from 'react-native';
import HumidityGraph from '../../components/HumidityGraph';
import TemperatureGraph from '../../components/Temperature';
import { DataProvider } from '../../context/dataImport';
import RadiationGraph from '../../components/Radiation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const App: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date("2023-10-01T00:00"));
  const [endDate, setEndDate] = useState(new Date("2023-10-10T23:00"));
  const [open, setOpen] = useState(false);

  return (

    <SafeAreaProvider>
      <ScrollView >
        <View className='bg-gradient-to-t from-cyan-500 to-blue-500'>
          <View className='z-30'>
            <View className='flex-row'>
              <View >
                <Text className='text-center'>Start Date</Text>
                <ReactDatePicker 
                  showTimeSelect
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date("2023-10-01T00:00")}
                  maxDate={new Date("2023-10-10T23:00")}
                  showDisabledMonthNavigation
                  />
              </View>
              <View>
                <Text className='text-center'>End Date</Text>
                <ReactDatePicker 
                  showTimeSelect
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date("2023-10-10T23:00")}
                  minDate={startDate}
                  />
              </View>
            </View>
          </View>
          <View className='z-10'>
            <View className='m-20'>
              <View >
                <View className='mr-1'>
                  <Text className='text-lg'>Start Date: {startDate.toLocaleString()}</Text>
                </View>
                <Text className='text-lg'>End Date: {endDate.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          <View className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
            <DataProvider startDate={startDate} endDate={endDate}>
              <HumidityGraph />
              <TemperatureGraph/>
              <RadiationGraph/>
            </DataProvider>
          </View>

        </View>
      </ScrollView>
    </SafeAreaProvider>

  );
};

export default App;

