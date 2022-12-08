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

export const BowelRegisterScreen = ({ navigation, route }) => {
  const [bowelMovement, setBowelMovement] = useState(null);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const handleNavigation = (navigation) => {
    if (!bowelMovement || Math.trunc(bowelMovement) < 1) {
      setIsError({
        error: true,
        message: "veuillez entrer des valeurs correctes",
      });
      return;
    }
    navigation.navigate("HealthRegister", { ...route.params, bowelMovement });
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
      {bowelMovement && (
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
              source={require("../../../image/animations/bowel.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <Spacer position="top" size="medium">
            <Title>
              Combien de fois ètes vous allé aux toilettes aujourd'hui?{" "}
            </Title>
          </Spacer>
          {isError.error && (
            <Spacer position="top" size="small">
              <ErrorText>{isError.message}</ErrorText>
            </Spacer>
          )}

          <Spacer position="top" size="large">
            <Input
              label="Nombre de tours aux toilettes"
              value={bowelMovement}
              keyboardType="phone-pad"
              onChangeText={(text) => setBowelMovement(text)}
            />
          </Spacer>

          <Spacer position="top" size="large">
            <ButtonWrapper>
              <Spacer position="top" size="medium">
                <ButtonInfo
                  bg={colors.brand.primary}
                  onPress={() =>
                    navigation.navigate("HealthRegister", {
                      ...route.params,
                      bowelMovement: 0,
                    })
                  }
                >
                  Je ne suis pas allé aux toilettes
                </ButtonInfo>
              </Spacer>
            </ButtonWrapper>
          </Spacer>
        </ContentWrapper>
      </Wrapper>
    </SafeArea>
  );
};
