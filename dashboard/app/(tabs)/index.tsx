import React, {useState} from 'react';
import {ScrollView, Button, Text, View , SafeAreaView, StyleSheet} from 'react-native';
import HumidityGraph from '../../components/HumidityGraph';
import TemperatureGraph from '../../components/Temperature';
import { DataProvider } from '../../context/dataImport';
import RadiationGraph from '../../components/Radiation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropDownPicker from 'react-native-dropdown-picker';


const App: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date("2023-10-01T00:00"));
  const [endDate, setEndDate] = useState(new Date("2023-10-10T23:00"));
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [dropdownValues, setDropdownValues] = useState([
    {label: 'None', value:0},
    {label: 'Average', value:1},
    {label: 'Max', value:2},
    {label: 'Min', value:3}
  ]);


  return (

    <SafeAreaProvider>
      <ScrollView >
        <View className='bg-cyan-100'>
          <View className='z-30'>
            <View className='flex-row'>
              <View className='w-3/6'>
                <Text className='text-center'>Start Date</Text>
                <View className='items-center'>
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
              </View>
              <View className='w-3/6'>
                <Text className='text-center'>End Date</Text>
                <View  className='items-center'>
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
          </View>
          <View className='z-10'>
            <View className='m-20'>
              <View className='items-center'>
                <View className='bg-gray-200'>
                  <View className='m-5'>
                    <View className='rounded-lg'>
                    <Text className='text-lg'>Start Date: {startDate.toLocaleString()}</Text>
                    <Text className='text-lg'>End Date: {endDate.toLocaleString()}</Text>
                      {/* <DropDownPicker
                        open={open}
                        value={value}
                        items={dropdownValues}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setDropdownValues}
                      />
                      <Text>{value}</Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className='grid'>
            <View className='grid-cols-12'>
            <DataProvider startDate={startDate} endDate={endDate} aggregate={value}>
              <View className='m-5'>
                <View className='bg-slate-50'>
                  <HumidityGraph />
                </View>
              </View>
              <View className='m-5'>
                <View className='bg-slate-50'>
                  <TemperatureGraph/>
                </View>
              </View>
              <View className='m-5'>
                <View className='bg-slate-50'>
                  <RadiationGraph/>
                </View>
              </View>
                        
                        
            </DataProvider>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaProvider>

  );
};



export default App;