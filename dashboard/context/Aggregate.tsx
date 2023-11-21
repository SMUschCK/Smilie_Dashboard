import React, { createContext, useContext, useEffect, useState , ReactNode } from 'react';


interface AggregatesProps {
    aggregate: {
        time: string[];
        relativeHumuditiy: [];
        directRadiation: [];
    }

  };


  export const Aggregator: React.FC<AggregatesProps> = ({ dataParent: forecastData, aggregateHours: number, children }) => {
    const calculateAggregate = (dataParent: ForecastData, aggregate: number): ForecastData => {
        const humidityData = dataParent.hourly.relativehumidity_2m;
        const radiationData = dataParent.hourly.direct_radiation;

        let tempAggregate ={
          "relativehumidity_2m": [],
          "direct_radiation": []
        };
      

        let startDateTime = new Date(dataParent.hourly.time[0]);
        let nextTime = new Date( startDateTime.setHours(startDateTime.getHours() + aggregateHours));

        let indicesAggregate: number[] = [];

        for (let i = 0; i < dataParent.hourly.time.length; i++) {
            let ele = new Date(dataParent.hourly.time[i]);
            if ( ele>= startDateTime && ele < nextTime) {
                indicesAggregate.push(i);
            } else if (ele >= nextTime){
                let valuesToClear = indicesAggregate.map(index => humidityData[index].value);
                tempAggregate.relativehumidity_2m.push(valuesToClear.reduce((sum, value) => sum+value, 0)/valuesToClear.length);
                tempAggregate.relativehumidity_2m.push(Math.max(...valuesToClear));
                tempAggregate.relativehumidity_2m.push(Math.min(...valuesToClear));

                valuesToClear = indicesAggregate.map(index => radiationData[index].value);
                tempAggregate.direct_radiation.push(valuesToClear.reduce((sum, value) => sum+value, 0)/valuesToClear.length);
                tempAggregate.direct_radiation.push(Math.max(...valuesToClear));
                tempAggregate.direct_radiation.push(Math.min(...valuesToClear));

                startDateTime = ele;
                nextTime = new Date(startDateTime.setHours(startDateTime.getHours() + aggregateHours));
                indicesAggregate.length = 0;
                indicesAggregate.push(i);
            }
          }
          let valuesToClear = indicesAggregate.map(index => humidityData[index].value);
          tempAggregate.relativehumidity_2m.push(valuesToClear.reduce((sum, value) => sum+value, 0)/valuesToClear.length);
          tempAggregate.relativehumidity_2m.push(Math.max(...valuesToClear));
          tempAggregate.relativehumidity_2m.push(Math.min(...valuesToClear));

          valuesToClear = indicesAggregate.map(index => radiationData[index].value);
          tempAggregate.direct_radiation.push(valuesToClear.reduce((sum, value) => sum+value, 0)/valuesToClear.length);
          tempAggregate.direct_radiation.push(Math.max(...valuesToClear));
          tempAggregate.direct_radiation.push(Math.min(...valuesToClear));
          indicesAggregate.length = 0;
      
      };
      
      
      
      

  };