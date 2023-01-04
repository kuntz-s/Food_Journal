import React, { useState } from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import styled from "styled-components";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/utility/SpacerComponent";
import {
  Wrapper,
  GoBackButton,
  GoNextButton,
  AnimationWrapper,
  LottieAnimation,
  ContentWrapper,
  Title,
} from "../components/RegisteringStyles";

const SwitchWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[4]};
`;

const BooleanTextInfo = styled(Text)`
    font-size:${(props) => props.theme.fontSizes.title}
    font-weight:bold;
    ${(props) =>
      props.vegetablesEaten &&
      props.name === "oui" &&
      `color:${props.theme.colors.brand.primary}`}
      ${(props) =>
        !props.vegetablesEaten &&
        props.name === "non" &&
        `color:${props.theme.colors.brand.primary}`}
`;

export const VegetableRegisterScreen = ({ navigation, route }) => {
  const { foodsList, drinksList, waterQuantity, fruitsEaten } = route.params;
  console.log(route.params);
  const [vegetablesEaten, setVegetablesEaten] = useState(false);

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
          <GoNextButton
            mode="contained"
            onPress={() =>
              navigation.navigate("BowelRegister", {
                ...route.params,
                vegetablesEaten,
              })
            }
            color={colors.brand.primary}
          >
            Suivant
          </GoNextButton>
        </View>
        <Spacer position="top" size="large">
          <AnimationWrapper>
            <LottieAnimation
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../image/animations/vegetables.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <Spacer position="top" size="medium">
            <Title>Avez vous consommé des légumes ? </Title>
          </Spacer>

          <Spacer position="top" size="small">
            <SwitchWrapper>
              <Spacer position="right" size="large">
                <BooleanTextInfo name="non" vegetablesEaten={vegetablesEaten}>
                  Non
                </BooleanTextInfo>
              </Spacer>
              <Spacer position="left" sizer="small">
                <Text>
                  <Switch
                    value={vegetablesEaten}
                    onValueChange={() => setVegetablesEaten(!vegetablesEaten)}
                    style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
                  />
                </Text>
              </Spacer>

              <Spacer position="left" size="large">
                <BooleanTextInfo name="oui" vegetablesEaten={vegetablesEaten}>
                  Oui
                </BooleanTextInfo>
              </Spacer>
            </SwitchWrapper>
          </Spacer>
        </ContentWrapper>
      </Wrapper>
    </SafeArea>
  );
};
