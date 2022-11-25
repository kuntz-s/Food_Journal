import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { eachDayOfInterval, getDate, getDay } from "date-fns";
import styled from "styled-components";
import { listeJours, listeMois } from "../../../components/Constant";
import { JournalContext } from "../../../services/journal/JournalContext";
import { Spacer } from "../../../components/utility/SpacerComponent";

const NBRE_ELEMENTS = 31;

const SliderWrapper = styled(View)`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[4]};
  background-color:  transparent;
`;

const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.brand.white};
  text-align:center;
`;

const DateWrapper = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.sizes[2]};
  ${(props) =>
    props.day === getDate(props.item) &&
    `background-color:#21634C`};
`;

const Day = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.brand.gray};
  ${(props) => props.day === getDate(props.item) && `font-weight: ${props.theme.fontWeights.medium}`};
  
`;
//${(props) => props.day === getDate(props.item) && `color:white`};

const DateNumber = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.brand.white};
`;
//${(props) => props.day === getDate(props.item) && `color:white`};

export const DatesSlider = () => {
  const { chosenDate, handleDateChange } = useContext(JournalContext);
  const [datesList, setDatesList] = useState([]);

  //ref params
  const flatListRef = useRef(null);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    let liste = eachDayOfInterval({
      start: new Date(chosenDate.year, chosenDate.month - 1),
      end: new Date(chosenDate.year, chosenDate.month),
    });
    liste.pop();
    setDatesList(liste);
  }, [chosenDate.year, chosenDate.month, chosenDate.day, flatListRef]);

  const handlePress = (dateInfo) => {
    if(getDate(dateInfo) === chosenDate.day){return;}
    handleDateChange({
      month:chosenDate.month,
      year: chosenDate.year,
      day: getDate(dateInfo)
    })
  };

  return (
    <SliderWrapper>
      <Spacer position="bottom" size="medium">
        <Title>
          {listeMois[chosenDate.month - 1].nom} {chosenDate.year}
        </Title>
      </Spacer>

      <FlatList
        ref={flatListRef} // add ref
        getItemLayout={(data, index) => ({
          length: NBRE_ELEMENTS,
          offset: NBRE_ELEMENTS * index,
          index,
        })}
        viewabilityConfig={viewConfigRef.current}
        data={datesList}
        renderItem={({ item }) => {
          return (
            <Spacer position="right" size="medium">
              <DateWrapper
                item={item}
                day={chosenDate.day}
                onPress={() => handlePress(item)}
              >
                <Day item={item} day={chosenDate.day}>
                  {listeJours[getDay(item - 1)].abr}
                </Day>
                <DateNumber item={item} day={chosenDate.day}>
                  {getDate(item)}
                </DateNumber>
              </DateWrapper>
            </Spacer>
          );
        }}
        keyExtractor={(item, id) => id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SliderWrapper>
  );
};
