import React, { useContext } from "react";
import { View, Text } from "react-native";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { Spacer } from "../../../components/utility/SpacerComponent";
import { JournalContext } from "../../../services/journal/JournalContext";
import { colors } from "../../../infrastructure/theme/colors";
import {
  Wrapper,
  AnimationWrapper,
  LottieAnimation,
  ContentWrapper,
  Title,
  ButtonInfo,
} from "../components/RegisteringStyles";

export const ConfirmRegisterScreen = ({ navigation }) => {
  const { isSubmitLoading } = useContext(JournalContext);

  return (
    <SafeArea>
      <Wrapper>
        <Spacer position="top" size="large">
          <AnimationWrapper>
            {isSubmitLoading && (
              <LottieAnimation
                key="animation"
                autoPlay
                loop
                resizeMode="cover"
                source={require("../../../image/animations/loading.json")}
              />
            )}
            {!isSubmitLoading && (
              <LottieAnimation
                key="animation"
                autoPlay
                loop
                resizeMode="cover"
                source={require("../../../image/animations/correct.json")}
              />
            )}
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <Title>
            {isSubmitLoading
              ? "Votre requète est en cours de traitement"
              : "Votre requète a été traitée avec succès"}
          </Title>

          <Spacer position="top" size="large">
            <ButtonInfo
              bg={colors.brand.primary}
              mode="contained"
              onPress={() => {
                navigation.navigate("Journal");
              }}
            >
              Continuer
            </ButtonInfo>
          </Spacer>
        </ContentWrapper>
      </Wrapper>
    </SafeArea>
  );
};
