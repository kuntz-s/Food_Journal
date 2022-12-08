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
  const [drinkName, setDrinkName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isError, setIsError] = useState({ error: false, message: "" });

  const handlePress = () => {
    if (drinkName && quantity && !isNaN(quantity)) {
      if (quantity <= 0) {
        setIsError({
          error: true,
          message: "veuillez entrer des valeurs supérieurs à 0",
        });
        return;
      }
      if (verifyDuplicate(drinkName)) {
        setIsError({
          error: true,
          message: "Vous avez déjà entré cette boisson",
        });
        return;
      }
      addFood(drinkName, quantity);
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
            <ModalTitle>Veuillez saisir une boisson</ModalTitle>
            <Spacer position="top" size="small">
              {isError.error && <ErrorText>{isError.message}</ErrorText>}
            </Spacer>
            <Spacer position="top" size="large">
              <Input
                label="Nom de la boisson"
                value={drinkName}
                onChangeText={(text) => setDrinkName(text)}
              />
            </Spacer>

            <Spacer position="top" size="large">
              <Input
                label="Quantité bue (en Litres)"
                value={quantity}
                keyboardType="phone-pad"
                onChangeText={(text) => setQuantity(text)}
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
