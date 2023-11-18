import { StyleSheet } from 'react-native';
import Graph1 from '../../components/Graph';
import HumidityGraph from '../../components/HumidityGraph';
import TemperatureGraph from '../../components/Temperature';
import { DataProvider } from '../../context/dataImport';
import RadiationGraph from '../../components/Radiation';

const App: React.FC = () => {
  return (
    <DataProvider>
      <HumidityGraph />
      <TemperatureGraph/>
      <RadiationGraph/>
    </DataProvider>
    
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
