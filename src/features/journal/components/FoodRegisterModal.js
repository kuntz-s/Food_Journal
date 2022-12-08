import React, { useState } from "react";
import { Modal, Portal, Provider} from "react-native-paper";
import { Text, View } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import styled from "styled-components";
import { Spacer } from "../../../components/utility/SpacerComponent";
import { ButtonInfo, Input, ErrorText } from "./RegisteringStyles";

const ModalWrapper = styled(Modal).attrs((props) => ({
  contentContainerStyle: {
    backgroundColor: "white",
    margin: 14,
    borderRadius: 10,
  },
}))``;

const ModalContent = styled(View)`
  padding: ${(props) => props.theme.space[4]};
`;

const ModalTitle = styled(Text)`
    text-align:center;
    font-size:${(props) => props.theme.fontSizes.title}
    font-weight:bold;
`;


export const ModalInput = ({
  visible,
  hideModal,
  addFood,
  verifyDuplicate,
}) => {
  const [foodName, setFoodName] = useState("");
  const [timesEaten, setTimesEaten] = useState("");
  const [isError, setIsError] = useState({ error: false, message: "" });

  const handlePress = () => {
    if (foodName && timesEaten && !isNaN(timesEaten)) {
      if (timesEaten < 1) {
        setIsError({
          error: true,
          message: "veuillez entrer des valeurs supérieurs à 0",
        });
        return;
      }
      if (verifyDuplicate(foodName)) {
        setIsError({
          error: true,
          message: "Vous avez déjà entré cette nourriture",
        });
        return;
      }
      addFood(foodName, timesEaten);
      hideModal();
      return;
    }
    setIsError({
      error: true,
      message: "veuillez entrer des valeurs correctes",
    });
    return;
  };

  return (
    <Provider>
      <Portal>
        <ModalWrapper visible={visible} onDismiss={hideModal}>
          <ModalContent>
            <ModalTitle>Veuillez saisir un repas</ModalTitle>
            <Spacer position="top" size="small">
              {isError.error && <ErrorText>{isError.message}</ErrorText>}
            </Spacer>
            <Spacer position="top" size="large">
              <Input
                label="Nom du repas"
                value={foodName}
                onChangeText={(text) => setFoodName(text)}
              />
            </Spacer>

            <Spacer position="top" size="large">
              <Input
                label="Nombre de fois mangé"
                value={timesEaten}
                keyboardType="phone-pad"
                onChangeText={(text) => setTimesEaten(text)}
              />
            </Spacer>
            <Spacer position="top" size="large">
              <ButtonInfo
                mode="contained"
                icon="plus"
                bg={colors.brand.primary}
                onPress={handlePress}
              >
                Ajouter
              </ButtonInfo>
            </Spacer>
          </ModalContent>
        </ModalWrapper>
      </Portal>
    </Provider>
  );
};
