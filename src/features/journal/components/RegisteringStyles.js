import { View, Text,ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import { Button , TextInput} from "react-native-paper";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const Wrapper = styled(ScrollView)`
  padding: ${(props) => props.theme.space[3]};
  flex: 1;  
`;
export const AnimationWrapper = styled(View)`
  align-items: center;

  
`;

export const ContentWrapper = styled(View)`
  flex:1;
`

export const LottieAnimation = styled(LottieView)`
  width: 300px;
  height: 250px;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  text-align: center;
  color: ${(props) => props.theme.colors.brand.primary};
`;

export const ButtonWrapper = styled(View)``;
export const ButtonInfo = styled(Button).attrs((props) => ({
  color: props.bg ? props.bg : "transparent",
  labelStyle: {
    fontSize: 16,
  },
}))`
  border-radius: 30px;
  padding: ${(props) => props.theme.space[1]};
`;


export const GoBackButton = styled(Button)`
`;

export const GoNextButton = styled(Button)`
  border-radius:20px;
`;

export const Input = styled(TextInput).attrs((props) => ({
  activeUnderlineColor: colors.brand.primary,
}))`
  font-size: ${(props) => props.theme.fontSizes.title};
  height: ${(props) => props.theme.space[5]};
`;

export const ErrorText = styled(Text)`
text-align:center;
font-size:${(props) => props.theme.fontSizes.body}
color:${(props) => props.theme.colors.brand.error}
`;
