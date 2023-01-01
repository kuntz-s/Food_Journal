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
  flex-direction: row;
  align-items:center;
  padding: ${(props) => props.theme.space[3]};
  border-radius: 13px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#ffefc1")};
`;

const CardTextInfo = styled(View)`
`;

const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) =>
    props.titleColor ? props.titleColor : props.theme.colors.brand.primary};
`;

const SubTitleTotal = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight:bold;
  color:${(props) => props.titleColor ? props.titleColor : props.theme.colors.brand.primary};
`;

const SubTitleAverage = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const StatisticsCard = ({
  imgUrl,
  titleName,
  total,
  average,
  titleColor,
  bgColor,
}) => {
  return (
    <CardInfo
      bgColor={bgColor}
      style={{ elevation: 3, shadowColor: "black" }}
      activeOpacity={0.5}
    >
      <ImageIllustration
        source={imgUrl ? imgUrl : require(`../../../image/foodImage1.png`)}
      />
      <Spacer position="left" size="large" />
      <CardTextInfo>
        <Title titleColor={titleColor}>
          {!titleName ? "non défini" : titleName}
        </Title>
        <Spacer position="top" size="medium" />
        <SubTitleTotal titleColor={titleColor}>TOTAL : {total && `${total}`}</SubTitleTotal>
        { 
          average && (
            <Spacer position="top" size="small">
          <SubTitleAverage>
            Moyenne par jour : {average && `${average}`}
          </SubTitleAverage>
        </Spacer>
          )
        }
      </CardTextInfo>
    </CardInfo>
  );
};
