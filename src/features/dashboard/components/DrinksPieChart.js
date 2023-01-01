import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { ChartTitle } from "./dashboardStyles";



export const DrinksPieChart = ({ drinksList }) => {
  return (
   <>
   <ChartTitle>Consommation de boissons</ChartTitle>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {drinksList && (
        <PieChart
          data={drinksList}
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
          accessor="quantity"
          backgroundColor="transparent"
         
        />
      )}
    </ScrollView>
   </>
  );
};

