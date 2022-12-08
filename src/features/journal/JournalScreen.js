import React, { useContext, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import styled from "styled-components";
import { SafeArea } from "../../components/utility/SafeAreaComponent";
import { JournalHeader } from "./components/JournalHeader";
import { DatesSlider } from "./components/DatesOfMonthSlider";
import { DataDisplay } from "./components/DataDisplay";
import { JournalContext } from "../../services/journal/JournalContext";

export const JournalScreen = ({navigation}) => {
  const { isModalVisible, createTables } = useContext(JournalContext);

  const DataWrapper = styled(View)`
  flex:1;
    background-color: ${(props) => props.theme.colors.brand.white};
    transform: translateY(-16px);
    border-radius: 20px;
    padding: ${(props) => props.theme.space[3]};
  `;

  const Background = styled(ImageBackground).attrs({
    source: require("../../image/appBackground.jpg"),
  })``;

  const BackgroundModal = styled(ImageBackground).attrs({
    source: require("../../image/appBackground.jpg"),
  })`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(2, 74, 49, 0.9);
  `;

  const AccountCoverModal = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(2, 74, 49, 0.6);
  `;

  useEffect(() => {
    createTables();
  }, []);

  if (isModalVisible) {
    return (
      <SafeArea>
        <BackgroundModal>
          <AccountCoverModal />
          <JournalHeader />
        </BackgroundModal>
      </SafeArea>
    );
  } else {
    return (
      <SafeArea>
        <Background>
          <AccountCover /> 
          <JournalHeader />
          <DatesSlider />
        </Background>
        <DataWrapper>
          <DataDisplay navigation ={navigation} />
        </DataWrapper>
      </SafeArea>
    );
  }
};
