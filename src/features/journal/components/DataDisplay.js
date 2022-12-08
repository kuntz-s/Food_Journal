import React, { useContext } from "react";
import {  ActivityIndicator } from "react-native-paper";
import { JournalContext } from "../../../services/journal/JournalContext";
import { colors } from "../../../infrastructure/theme/colors";
import { listeMois } from "../../../components/Constant";
import { Spacer } from "../../../components/utility/SpacerComponent";
import { DataCard } from "./DataCard";
import {
  getWaterQuantity,
  getOtherDrinksQuantity,
  getUniqueDrinks,
  getUniqueFoods,
} from "./Constants";
import { Wrapper,CalendarIcon, DayInfoWrapper,DayInfo,NutritionInfoWrapper, NotFoundWrapper, NotFoundImage, NotFoundText, NotFoundButton, LoadingWrapper } from "./DataDisplayStyles";


const NotFoundComponent = ({ navigation, chosenDate }) => {
  return (
    <NotFoundWrapper>
      <DayInfoWrapper>
        <Spacer position="right" size="medium">
          <CalendarIcon name="calendar" />
        </Spacer>
        <DayInfo>
          {chosenDate.day} {listeMois[chosenDate.month - 1].nom}{" "}
          {chosenDate.year}
        </DayInfo>
      </DayInfoWrapper>
      <NotFoundImage source={require("../../../image/notFound.png")} />
      <NotFoundText>Aucune donnée trouvée pour cette date</NotFoundText>
      <NotFoundButton icon="plus" mode="contained" onPress={() => {navigation.navigate("FoodRegister")}}>
        Ajouter{" "}
      </NotFoundButton>
    </NotFoundWrapper>
  );
};

export const DataDisplay = ({ navigation }) => {
  const { isLoading, nutritionInfo, chosenDate } = useContext(JournalContext);
  if (nutritionInfo.length === 0) {
    if (isLoading) {
      return (
        <LoadingWrapper>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.brand.primary}
          />
        </LoadingWrapper>
      );
    } else {
      return (
        <NotFoundComponent navigation={navigation} chosenDate={chosenDate} />
      );
    }
  } else {
    if (isLoading) {
      return (
        <LoadingWrapper>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.brand.primary}
          />
        </LoadingWrapper>
      );
    } else {
      return (
        <Wrapper showsVerticalScrollIndicator={false}>
          <DayInfoWrapper>
            <Spacer position="right" size="medium">
              <CalendarIcon name="calendar" />
            </Spacer>
            <DayInfo>
              {chosenDate.day} {listeMois[chosenDate.month - 1].nom}{" "}
              {chosenDate.year}
            </DayInfo>
          </DayInfoWrapper>
          <NutritionInfoWrapper>
            <Spacer position="top" size="small">
              <DataCard
                navigation={navigation}
                imgUrl={require(`../../../image/foodImage.png`)}
                titleName="REPAS"
                subTitleName="Total repas consommés"
                subTitleValue={getUniqueFoods(nutritionInfo).length}
                data={getUniqueFoods(nutritionInfo)}
                name="food"
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                titleColor="#00779C"
                bgColor="#D1EDFF"
                imgUrl={require(`../../../image/Eau.png`)}
                titleName="EAU"
                subTitleName="Quantité d'eau bue"
                subTitleValue={`${getWaterQuantity(nutritionInfo)} L`}
                data={getUniqueDrinks(nutritionInfo)}
                name="water"
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                titleColor="#872601"
                bgColor="#ffc9bb"
                imgUrl={require(`../../../image/Boisson.png`)}
                titleName="BOISSON"
                subTitleName="Quantité de liquide:"
                subTitleValue={`${getOtherDrinksQuantity(nutritionInfo)} L`}
                data={getUniqueDrinks(nutritionInfo)}
                name="drinks"
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                imgUrl={require(`../../../image/Fruits.png`)}
                titleName="FRUITS"
                subTitleName={
                  nutritionInfo[0].fruits
                    ? "Vous avez consommé des fruits"
                    : "Aucun fruit consommé"
                }
                data={nutritionInfo[0]}
                name="fruits"
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                bgColor="#C1DEB6"
                imgUrl={require(`../../../image/Legumes.png`)}
                titleName="LEGUMES"
                subTitleName={
                  nutritionInfo[0].vegetables
                    ? "Vous avez mangé des légumes"
                    : "Aucun légumes consommé"
                }
                data={nutritionInfo[0]}
                name="vegetables"
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                titleColor="black"
                bgColor="#FECC91"
                imgUrl={require(`../../../image/Health.png`)}
                titleName="SANTE"
                subTitleName={
                  nutritionInfo[0].reason 
                    ? "Problème de santé signalé"
                    : "Aucun problème signalé"
                }
                name="health"
                data={nutritionInfo[0]}
              />
            </Spacer>
            <Spacer position="top" size="large">
              <DataCard
                navigation={navigation}
                titleColor="#0E3663"
                bgColor="#CDDBEA"
                imgUrl={require(`../../../image/Toilet1.png`)}
                titleName="TOILETTE"
                subTitleName="Nombre de tours"
                subTitleValue={nutritionInfo[0].bowelMovement}
                name="bowel"
                data={nutritionInfo[0]}
              />
            </Spacer>
          </NutritionInfoWrapper>
        </Wrapper>
      );
    }
  }
};
