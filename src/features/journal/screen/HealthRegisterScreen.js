import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import styled from "styled-components";
import { JournalContext } from "../../../services/journal/JournalContext";
import { DashboardContext } from "../../../services/dashboard/DashboardContext";
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
  ErrorText,
  Input,
} from "../components/RegisteringStyles";

const SwitchWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
`;

const BooleanTextInfo = styled(Text)`
    font-size:${(props) => props.theme.fontSizes.title}
    font-weight:bold;
    ${(props) =>
      !props.isHealthy &&
      props.name === "oui" &&
      `color:${props.theme.colors.brand.primary}`}
      ${(props) =>
        props.isHealthy &&
        props.name === "non" &&
        `color:${props.theme.colors.brand.primary}`}
`;

export const HealthRegisterScreen = ({ navigation, route }) => {
  const { insertData } = useContext(JournalContext);
  const { handleIncrement } = useContext(DashboardContext);
  const [healthReason, setHealthReason] = useState(null);
  const [isHealthy, setIsHealthy] = useState(true);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const handleNavigation = (navigation) => {
    if (!isHealthy && !healthReason) {
      setIsError({
        error: true,
        message: "veuillez entrer des valeurs correctes",
      });
      return;
    }
    insertData({
      ...route.params,
      isHealthy,
      healthReason: isHealthy ? null : healthReason,
    });
    handleIncrement();
    navigation.navigate("ConfirmRegister");
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
          {(isHealthy || (!isHealthy && healthReason)) && (
            <GoNextButton
              mode="contained"
              onPress={() => handleNavigation(navigation)}
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
              source={require("../../../image/animations/healthy.json")}
            />
          </AnimationWrapper>
        </Spacer>

        <ContentWrapper>
          <Spacer position="top" size="medium">
            <Title>Avez vous eu des problèmes de santé ?</Title>
          </Spacer>

          <Spacer position="top" size="small">
            <SwitchWrapper>
              <Spacer position="right" size="large">
                <BooleanTextInfo name="non" isHealthy={isHealthy}>
                  Non
                </BooleanTextInfo>
              </Spacer>
              <Spacer position="left" sizer="small">
                <Text>
                  <Switch
                    value={!isHealthy}
                    onValueChange={() => setIsHealthy(!isHealthy)}
                    style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
                  />
                </Text>
              </Spacer>

              <Spacer position="left" size="large">
                <BooleanTextInfo name="oui" isHealthy={isHealthy}>
                  Oui
                </BooleanTextInfo>
              </Spacer>
            </SwitchWrapper>
          </Spacer>

          {isError.error && (
            <Spacer position="top" size="small">
              <ErrorText>{isError.message}</ErrorText>
            </Spacer>
          )}

          {!isHealthy && (
            <Spacer position="top" size="medium">
              <Input
                label="Problème de santé"
                value={healthReason}
                onChangeText={(text) => setHealthReason(text)}
              />
            </Spacer>
          )}
        </ContentWrapper>
      </Wrapper>
    </SafeArea>
  );
};
