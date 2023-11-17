import { StyleSheet } from 'react-native';
import Graph1 from '../../components/Graph';
import { DataProvider } from '../../context/dataImport';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Graph1 />
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
