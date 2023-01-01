import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../components/utility/SafeAreaComponent";
import { Spacer } from "../../components/utility/SpacerComponent";
import { StatisticsCard } from "./components/StatisticsCard";
import { DashboardContext } from "../../services/dashboard/DashboardContext";
import { FoodPieChart } from "./components/FoodPieChart";
import { DrinksPieChart } from "./components/DrinksPieChart";
import { getDrinksQuantity } from "./components/Constants";
import styled from "styled-components";

const Wrapper = styled(ScrollView).attrs({})`
  padding-vertical: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  flex: 1;
`;

const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.heading};
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brand.primary};
  text-transform: uppercase;
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const TimeStampWrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
  },
})`
  max-height: 70px;
`;

const TimeStampText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  border-radius: 20px;
  text-align: center;
  background-color: ${(props) =>
    props.chosen
      ? props.theme.colors.brand.primary
      : props.theme.colors.brand.gray};
  color: ${(props) => (props.chosen ? "white" : "black")};
`;

const StatWrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
  },
})`
  max-height: 130px;
`;

const params = [
  "Toutes les années",
  "Cette année uniquement",
  "Ce mois uniquement",
];

export const DashboardScreen = () => {
  const { foodsList, drinksList, daysNumber } = useContext(DashboardContext);
  const [paramId, setParamId] = useState(0);
  const [pieChartFoodData, setPieChartFoodData] = useState(null);
  const [pieChartDrinkData, setPieChartDrinkData] = useState(null);
  const [drinksQuantity, setDrinksQuantity] = useState({ water: 0, drink: 0 });

  useEffect(() => {
    if (foodsList.length > 0) {
      setPieChartFoodData(foodsList);
    }

    if (drinksList.length > 0) {
      setDrinksQuantity(getDrinksQuantity(drinksList));
      setPieChartDrinkData(drinksList);
    }
  }, [foodsList, drinksList]);

  return (
    <SafeArea>
      <Wrapper>
        <Title>Dashboard</Title>

        <Spacer position="bottom" size="large">
          <TimeStampWrapper
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {params.map((elt, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    setParamId(id);
                  }}
                  chosen={id === paramId ? true : false}
                >
                  <TimeStampText chosen={id === paramId ? true : false}>
                    {elt}
                  </TimeStampText>
                </TouchableOpacity>
              );
            })}
          </TimeStampWrapper>
        </Spacer>
        <StatWrapper horizontal={true} showsHorizontalScrollIndicator={false}>
          <Spacer position="right" size="large">
            <StatisticsCard
              titleColor="#00779C"
              bgColor="#D1EDFF"
              imgUrl={require(`../../image/Eau.png`)}
              titleName="EAU"
              total={pieChartDrinkData ? `${drinksQuantity.water} L` : `0 L`}
              average={
                pieChartDrinkData
                  ? `${Math.trunc((drinksQuantity.water / daysNumber) * 100)/100} `
                  : `0 `
              }
            />
          </Spacer>
          <Spacer position="right" size="large">
            <StatisticsCard
              titleColor="#872601"
              bgColor="#ffc9bb"
              imgUrl={require(`../../image/Boisson1.png`)}
              titleName="BOISSON"
              total={pieChartDrinkData ? `${drinksQuantity.drink} L` : `0 L`}
              average={
                pieChartDrinkData
                  ? `${Math.trunc((drinksQuantity.drink / daysNumber) * 100)/100} `
                  : `0 `
              }
            />
          </Spacer>
          <Spacer position="right" size="large">
            <StatisticsCard
              imgUrl={require(`../../image/foodImage1.png`)}
              titleName="REPAS"
              total={pieChartFoodData ? `${pieChartFoodData.length}` : `0`}
              average={
                pieChartFoodData
                  ? `${Math.floor(pieChartFoodData.length / daysNumber)} `
                  : `0 `
              }
            />
          </Spacer>
        </StatWrapper>

        {/**ici on va afficher les aliments les plus consommées 
        <View>
            <Text>Repas le plus consommé : </Text>
        </View>
        <View>
            <Text>Boisson la plus consommée : </Text>
        </View>*/}

        <Spacer position="bottom" size="medium">
          {pieChartFoodData && <FoodPieChart foodsList={pieChartFoodData} />}
        </Spacer>
        <Spacer position="bottom" size="medium">
          {pieChartDrinkData && (
            <DrinksPieChart drinksList={pieChartDrinkData} />
          )}
        </Spacer>
      </Wrapper>
    </SafeArea>
  );
};
