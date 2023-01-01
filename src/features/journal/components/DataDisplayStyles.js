import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const Wrapper = styled(ScrollView)`
  flex: 1;
`;

export const CalendarIcon = styled(Icon).attrs({
  color: colors.brand.primary,
})`
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

export const DayInfoWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DayInfo = styled(Text)`
  color: ${(props) => props.theme.colors.brand.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
`;

export const NutritionInfoWrapper = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const NotFoundWrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
  },
})`
flex: 1;
`;;

export const NotFoundImage = styled(Image)`
  height: 270px;
  width: 270px;
  border-radius: 80px;
  resize-mode: contain;
`;

export const NotFoundText = styled(Text)`
  transform: translateY(-30px);
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: #00563f;
`;

export const NotFoundButton = styled(Button).attrs({
  //we cannot use props when indexing attributes
  color: colors.brand.primary,
})`
  border-radius: 30px;
  padding: ${(props) => props.theme.space[1]};
`;

export const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
