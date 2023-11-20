import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Graph1 from '../../components/Graph';
import HumidityGraph from '../../components/HumidityGraph';
import TemperatureGraph from '../../components/Temperature';
import { DataProvider } from '../../context/dataImport';
import RadiationGraph from '../../components/Radiation';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



const App: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date("2023-10-01T00:00"));
  const [endDate, setEndDate] = useState(new Date("2023-10-10T23:00"));

  return (
    <ScrollView >
      <div>
      <ReactDatePicker
          showTimeSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date("2023-10-01T00:00")}
          maxDate={new Date("2023-10-10T23:00")}
          inline
          showDisabledMonthNavigation
        />
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
      </div>
      <Text>{startDate.toLocaleString()}</Text>
      <Text>{endDate.toLocaleString()}</Text>
      <DataProvider startDate={startDate} endDate={endDate}>
        <HumidityGraph />
        <TemperatureGraph/>
        <RadiationGraph/>
      </DataProvider>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
