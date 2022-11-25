import React, { useState, useContext } from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import { Button} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../infrastructure/theme/colors";
import { CalendarModal } from "./CalendarModal";
import { JournalContext } from "../../../services/journal/JournalContext";

const HeaderWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
  background-color: transparent;
`;

const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.brand.white};
`;

const IconWrapper = styled(Button)`
  border: none;
`;

const CalendarIcon = styled(Icon).attrs({
  color: colors.brand.white,
})`
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

export const JournalHeader = () => {
  const {isModalVisible, showModal, hideModal} = useContext(JournalContext);



  return (
    <>
      <HeaderWrapper>
        <Title>Journal Alimentaire</Title>
        <IconWrapper onPress={showModal} mode="text" color="gray">
          <CalendarIcon name="calendar-month" />
        </IconWrapper>
      </HeaderWrapper>
      <CalendarModal visible={isModalVisible} hideModal={hideModal} />
    </>
  );
};
