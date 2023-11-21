import { Button , View} from 'react-native';
import React, {useState} from 'react';
import Test from '../../components/Test';
import { DataProvider } from '../../context/dataImport';
// import { DataProvider } from '../../context/TestDataImport';
import HumidityGraph from '../../components/HumidityGraph';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../../tailwind.json';
import DatePicker from 'react-native-date-picker';

// const [startDate, setStartDate] = useState(new Date("2023-10-02"));
// const [endDate, setEndDate] = useState(new Date("2023-10-07"));
const endDate = [];

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2023-10-01T00:00"));
  return (
    <View> 

        <DataProvider startDate={new Date("2023-10-02T17:00")} endDate={new Date("2023-10-08T21:00")}>
          <HumidityGraph/>
          {/* <Test /> */}
          
        </DataProvider>
        <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
              modal
              open={open}
              date={startDate}
              onConfirm={(date) => {
                setOpen(false)
                setStartDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
    </View>
    
    
  );
};

export default App;

