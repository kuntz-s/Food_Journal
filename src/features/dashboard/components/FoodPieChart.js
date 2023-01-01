import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { ChartTitle } from "./dashboardStyles";
import styled from "styled-components";



export const FoodPieChart = ({ foodsList }) => {
  return (
   <>
    <ChartTitle > CONSOMMATION DE REPAS</ChartTitle>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      
      {foodsList && (
        <PieChart
          data={foodsList}
          width={Dimensions.get("window").width }
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            borderRadius: 16,
          }}
          accessor="timesEaten"
          backgroundColor="transparent"
         
        />
      )}
    </ScrollView></>
  );
};

