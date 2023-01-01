import styled from "styled-components";
import { View, Text, StyleSheet, Dimensions } from "react-native";


export const ChartTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  padding-top:${(props) => props.theme.space[4]}
  font-weight: bold;
  text-transform: capitalize;
  text-align:center;
  font-family: ${(props) => props.theme.fonts.body};
`;
