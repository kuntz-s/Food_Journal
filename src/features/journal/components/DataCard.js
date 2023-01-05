import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Spacer } from "../../../components/utility/SpacerComponent";

const ImageIllustration = styled(Image)`
  height: 80px;
  width: 80px;
  border-radius: 60px;
  resize-mode: contain;
`;

const CardInfo = styled(TouchableOpacity)`
  display: flex;
  
  flex-wrap:wrap;
  justify-content:center;
  flex-direction: row;
  padding: ${(props) => props.theme.space[2]};
  border-radius: 13px;
  background-color: ${(props) => props.bgColor ? props.bgColor:  "#ffefc1"};
`;

const CardTextInfo = styled(View)``;

const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.titleColor? props.titleColor: props.theme.colors.brand.primary};
  text-align:center;

`;

const SubTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align:center;
`;

export const DataCard = ({
  imgUrl,
  titleName,
  subTitleName,
  subTitleValue,
  titleColor,
  bgColor ,
  navigation,
  data, 
  name
}) => {
  return (
    <CardInfo bgColor={bgColor} style={{  elevation: 3,
      shadowColor: 'black'}} activeOpacity={0.5} onPress = {() => navigation.navigate( "NutritionDetail",{bgColor, titleColor,imgUrl,name, data})}>
      <ImageIllustration source={imgUrl ? imgUrl : require(`../../../image/foodImage1.png`)} />
      <Spacer position="left" size="medium"  >
      <CardTextInfo>
        <Title titleColor={titleColor}>{!titleName? "non défini" :titleName}</Title>
        <Spacer position="top" size="medium" />
        <SubTitle>
          {!subTitleName? "non défini" : subTitleName}  {subTitleValue && `: ${subTitleValue}` }
        </SubTitle>
      </CardTextInfo>
      </Spacer>
    </CardInfo>
  );
};
