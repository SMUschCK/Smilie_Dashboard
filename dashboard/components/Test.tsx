import React from 'react';
import { View, Text } from 'react-native';
import { VictoryBar } from 'victory';
import { useData } from '../context/dataImport';

// const Test: React.FC = () => {
//   const data = [
//     {quarter: 1, hData: 13000},
//     {quarter: 2, hData: 16500},
//     {quarter: 3, hData: 14250},
//     {quarter: 4, hData: 19000}
//   ];

//   console.log(data);

//     return (
//       <VictoryBar
//         data={data}
//         // data accessor for x values
//         x="quarter"
//         // data accessor for y values
//         y="hData"
//       />
//     )
  

// export default Test;

const data = [
  {quarter: 1, hData: 88},
  {quarter: 2, hData: 89},
  {quarter: 3, hData: 87},
  {quarter: 4, hData: 87}
];

const Test = () => {
  return (
    <VictoryBar
      data={data}
      // data accessor for x values
      x="quarter"
      // data accessor for y values
      y="hData"
    />
  );
};

// ReactDOM.render(<App/>, mountNode); // You don't need this line in a functional component

export default Test;
