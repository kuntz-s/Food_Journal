import React, { useState } from "react";
import { View, Text } from "react-native";
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
  ButtonInfo,
  ButtonWrapper,
  ErrorText,
  Input,
} from "../components/RegisteringStyles";

export const WaterRegisterScreen = ({ navigation, route }) => {
  const [waterQuantity, setWaterQuantity] = useState(null);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const handleNavigation = (navigation) => {
    if (!waterQuantity || isNaN(waterQuantity)) {
      setIsError({
        error: true,
        message: "veuillez entrer des valuers correctes",
      });
      return;
    }
    navigation.navigate("DrinkRegister", { ...route.params, waterQuantity });
  };

  return (
    <SafeArea>
      <GoBackButton
        onPress={() => navigation.goBack()}
        icon="arrow-left"
        color="black"
      >
        Retour
      </GoBackButton>
      {!isNaN(waterQuantity) && waterQuantity > 0 && (
        <GoNextButton
          mode="contained"
          onPress={() => handleNavigation(navigation)}
          color={colors.brand.primary}
        >
          Suivant
        </GoNextButton>
      )}
      <Wrapper>
        <Spacer position="top" size="large">
          <AnimationWrapper>
            <LottieAnimation
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={require("../../../image/animations/water.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <Spacer position="top" size="medium">
            <Title>Quelle quantité d'eau avez vous bu ? </Title>
          </Spacer>
          {isError.error && (
            <Spacer position="top" size="small">
              <ErrorText>{isError.message}</ErrorText>
            </Spacer>
          )}

          <Spacer position="top" size="large">
            <Input
              label="Quantité d'eau bue (en Litres)"
              value={waterQuantity}
              keyboardType="phone-pad"
              onChangeText={(text) => setWaterQuantity(text)}
            />
          </Spacer>

          <Spacer position="top" size="large">
            <ButtonWrapper>
              <Spacer position="top" size="medium">
                <ButtonInfo
                  bg={colors.brand.primary}
                  onPress={() =>
                    navigation.navigate("DrinkRegister", {
                      ...route.params,
                      waterQuantity: 0,
                    })
                  }
                >
                  Je n'ai pas bu d'eau aujourd'hui
                </ButtonInfo>
              </Spacer>
            </ButtonWrapper>
          </Spacer>
        </ContentWrapper>
      </Wrapper>
    </SafeArea>
  );
};
