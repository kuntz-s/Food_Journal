import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { Spacer } from "../../../components/utility/SpacerComponent";
import { colors } from "../../../infrastructure/theme/colors";
import { ModalInput } from "../components/DrinkRegisterModal";
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

const DrinkInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(2, 74, 49, 0.1);
  padding: ${(props) => props.theme.space[2]};
`;

export const DrinkTextInfo = styled(Text)`
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

export const DrinkRegisterScreen = ({ navigation, route }) => {
  const { foodsList, waterQuantity } = route.params;
  const [visible, setVisible] = useState(false);
  const [drinksList, setDrinksList] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const addFood = (drinkName, quantity) => {
    setDrinksList([
      ...drinksList,
      { drinkName: drinkName, quantity: quantity },
    ]);
  };

  const verifyDuplicate = (drinkName) => {
    if (drinksList.length === 0) {
      return;
    }
    const data = drinksList.find(
      (drink) => drink.drinkName.toLowerCase() === drinkName.toLowerCase()
    );
    if (data) {
      return true;
    }
    return false;
  };

  const handleDelete = (drinkName) => {
    let newdrinksList = drinksList.filter(
      (drink) => drink.drinkName !== drinkName
    );
    setDrinksList(newdrinksList);
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
        {drinksList.length > 0 && (
          <GoNextButton
            mode="contained"
            onPress={() =>
              navigation.navigate("FruitRegister", {
                ...route.params,
                drinksList: drinksList,
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
              source={require("../../../image/animations/drink.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <ScrollView>
            <Spacer position="top" size="medium">
              <Title>Quelle autre boisson avez vous bu ajourd'hui ? </Title>
            </Spacer>

            <Spacer position="top" size="large">
              {drinksList.map((drink, id) => {
                return (
                  <Spacer position="top" size="medium" key={id}>
                    <DrinkInfo>
                      <DrinkTextInfo>
                        {drink.drinkName} ({drink.quantity})
                      </DrinkTextInfo>
                      <IconWrapper
                        mode="text"
                        color="gray"
                        onPress={() => handleDelete(drink.drinkName)}
                      >
                        <TrashIcon name="delete-outline" />
                      </IconWrapper>
                    </DrinkInfo>
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
                  Ajouter une boisson
                </ButtonInfo>
                <Spacer position="top" size="medium">
                  <ButtonInfo
                    bg={colors.brand.primary}
                    onPress={() => {
                      setDrinksList([]);
                      navigation.navigate("FruitRegister", {
                        ...route.params,
                        drinksList: [],
                      });
                    }}
                  >
                    Je n'ai bu aucune boisson
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
