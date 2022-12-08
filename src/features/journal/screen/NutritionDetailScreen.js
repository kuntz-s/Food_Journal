import React from "react";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { SafeArea } from "../../../components/utility/SafeAreaComponent";
import { Spacer } from "../../../components/utility/SpacerComponent";
import {
  getWaterQuantity,
  getOtherDrinksQuantity,
  textDisplay,
} from "../components/Constants";

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  position: relative;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#ffefc1")};
`;

const ImageWrapper = styled(View)`
  display: flex;
  align-items: center;
`;

const ImageIllustration = styled(Image)`
  height: 200px;
  width: 200px;
  border-radius: 90px;
  resize-mode: contain;
`;
const Title = styled(Text)`
  color:${(props) =>
    props.titleColor ? props.titleColor : props.theme.colors.brand.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
  padding : ${(props) => props.theme.space[2]}
  font-weight:bold;
  text-align: center;
`;

const GoBackButton = styled(Button)`
  position: absolute;
  top: 10px;
`;

const DetailListWrapper = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;

const DetailListTextWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DetailListTitle = styled(Text)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const DetailListContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const handleDetail = (name, data) => {
  let value = null;
  let index = 0;
  if (name === "bowel") {
    value = data.bowelMovement;
  } else if (name === "water") {
    value = getWaterQuantity(data);
  } else if (name === "drinks") {
    value = getOtherDrinksQuantity(data);
  } else if (name === "food") {
    value = data.length;
  } else if (name === "health") {
    value = data.reason;
    if (!value ) {
      index = 1;
    }
  }

  if (
    value > 0 &&
    name !== "health" &&
    name !== "fruits" &&
    name !== "vegetables"
  ) {
    index = 1;
  }

  if (name === "fruits") {
    index = data.fruits;
  } else if (name === "vegetables") {
    index = data.vegetables;
  }
  return { value, index };
};

const DetailInfo = ({ name, data, titleColor }) => {
  const { index, value } = handleDetail(name, data);

  return (
    <View>
      <Title titleColor={titleColor}>{textDisplay(value)[name][index]}</Title>
    </View>
  );
};

const DetailListInfo = ({ name, data }) => {
  //verifier que le composant s'affiche uniquement pour les nourritures et boissons
  if (name !== "food" && name !== "drinks") {
    return;
  }

  let newData = data;
  if (name !== "food") {
    newData = newData.filter((data) => data.name !== "eau");
  }

  if (newData.length === 0) {
    return;
  }

  return (
    <DetailListWrapper>
      <DetailListTextWrapper>
        <DetailListTitle>Nom</DetailListTitle>
        <DetailListTitle>Quantité </DetailListTitle>
      </DetailListTextWrapper>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newData}
        renderItem={({ item }) => (
          <Spacer position="top" size="medium">
            <DetailListTextWrapper>
              <DetailListContent>
                {name === "food" ? item.foodName : item.name}
              </DetailListContent>
              <Spacer position="left" size="medium">
                <DetailListContent>
                  {name === "food"
                    ? ` ${item.timesEaten} fois`
                    : `${item.quantity} L`}
                </DetailListContent>
              </Spacer>
            </DetailListTextWrapper>
          </Spacer>
        )}
        keyExtractor={(item, id) => id}
      />
    </DetailListWrapper>
  );
};

export const NutritionDetailScreen = ({ route, navigation }) => {
  const { bgColor, titleColor, imgUrl, name, data } = route.params;
  return (
    <SafeArea>
      <Wrapper bgColor={bgColor}>
        <GoBackButton
          onPress={() => navigation.goBack()}
          icon="arrow-left"
          color="black"
        >
          Retour
        </GoBackButton>
        <ImageWrapper>
          <ImageIllustration
            source={imgUrl ? imgUrl : require(`../../../image/foodImage1.png`)}
          />
        </ImageWrapper>
        <DetailInfo data={data} titleColor={titleColor} name={name} />
        <DetailListInfo name={name} data={data} />
        {name === "health" && (
          <View style = {{textAlign:"center",alignItems:"center", padding:16}}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#024A31"}}> {data.reason && data.reason}</Text>
          </View>
        )}
      </Wrapper>
    </SafeArea>
  );
};
