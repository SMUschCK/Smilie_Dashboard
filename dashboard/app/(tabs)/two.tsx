import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import Test from '../../components/Test';
import { DataProvider } from '../../context/TestDataImport';
import ReactDatePicker from 'react-datepicker';

// const [startDate, setStartDate] = useState(new Date("2023-10-02"));
// const [endDate, setEndDate] = useState(new Date("2023-10-07"));
const endDate = [];
const App: React.FC = () => {
  return (
    <view> 
    <DataProvider startDate={new Date("2023-10-01")} endDate={new Date("2023-10-06")}>
      <Test />
    </DataProvider>
    </view>
    // <Test/>
    
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
