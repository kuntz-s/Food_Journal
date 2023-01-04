import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { Spacer } from "../../../components/utility/SpacerComponent";
import { colors } from "../../../infrastructure/theme/colors";
import { ModalInput } from "../components/FoodRegisterModal";
import {
  Wrapper,
  AnimationWrapper,
  LottieAnimation,
  Title,
  ButtonWrapper,
  ButtonInfo,
  ContentWrapper,
  GoBackButton,
  GoNextButton,
} from "../components/RegisteringStyles";
//import {fonts, fontSizes}  from "../../../infrastructure/theme/fonts";

const FoodInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(2, 74, 49, 0.1);
  padding: ${(props) => props.theme.space[2]};
`;

export const FoodTextInfo = styled(Text)`
  font-size: 18px;
  text-transform: capitalize;
`;

const IconWrapper = styled(Button)`
  border: none;
`;

const TrashIcon = styled(Icon).attrs({
  color: colors.brand.error,
})`
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

export const FoodRegisterScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [foodsList, setFoodsList] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const addFood = (foodName, timesEaten) => {
    setFoodsList([
      ...foodsList,
      { foodName: foodName, timesEaten: timesEaten },
    ]);
  };

  const verifyDuplicate = (foodName) => {
    if (foodsList.length === 0) {
      return;
    }
    const data = foodsList.find(
      (food) => food.foodName.toLowerCase() === foodName.toLowerCase()
    );
    if (data) {
      return true;
    }
    return false;
  };

  const handleDelete = (foodName) => {
    let newFoodsList = foodsList.filter((food) => food.foodName !== foodName);
    setFoodsList(newFoodsList);
  };

  return (
    <SafeArea>
      <Wrapper showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <GoBackButton
          onPress={() => navigation.goBack()}
          icon="arrow-left"
          color="black"
        >
          Retour
        </GoBackButton>
        {foodsList.length > 0 && (
          <GoNextButton
            mode="contained"
            onPress={() =>
              navigation.navigate("WaterRegister", {
                ...route.params,
                foodsList: foodsList,
              })
            }
            color={colors.brand.primary}
          >
            Suivant
          </GoNextButton>
        )}
        </View>
        <Spacer position="top" size="large">
          <AnimationWrapper>
            <LottieAnimation
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../image/animations/food-vlogger.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <ScrollView>
            <Spacer position="top" size="medium">
              <Title>Qu'avez vous mangé aujourd'hui ? </Title>
            </Spacer>

            <Spacer position="top" size="large">
              {foodsList.map((food, id) => {
                return (
                  <Spacer position="top" size="medium" key={id}>
                    <FoodInfo>
                      <FoodTextInfo>
                        {food.foodName} ({food.timesEaten})
                      </FoodTextInfo>
                      <IconWrapper
                        mode="text"
                        color="gray"
                        onPress={() => handleDelete(food.foodName)}
                      >
                        <TrashIcon name="delete-outline" />
                      </IconWrapper>
                    </FoodInfo>
                  </Spacer>
                );
              })}
            </Spacer>

            <Spacer position="top" size="large">
              <ButtonWrapper>
                <ButtonInfo
                  mode="contained"
                  bg={colors.brand.primary}
                  onPress={() => showModal()}
                >
                  Ajouter un repas
                </ButtonInfo>
                <Spacer position="top" size="medium">
                  <ButtonInfo
                    bg={colors.brand.primary}
                    onPress={() => {
                      setFoodsList([]);
                      navigation.navigate("WaterRegister", {
                        ...route.params,
                        foodsList: [],
                      });
                    }}
                  >
                    Je n'ai pas mangé aujourd'hui
                  </ButtonInfo>
                </Spacer>
              </ButtonWrapper>
            </Spacer>
          </ScrollView>
        </ContentWrapper>
        {/***modal display */}
      </Wrapper>
      {visible && (
        <ModalInput
          visible={visible}
          showModal={showModal}
          hideModal={hideModal}
          addFood={addFood}
          verifyDuplicate={verifyDuplicate}
        />
      )}
    </SafeArea>
  );
};
