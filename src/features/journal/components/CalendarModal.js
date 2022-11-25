import React, { useState, useContext } from "react";
import { Modal, Text } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components";
import { JournalContext } from "../../../services/journal/JournalContext";
import { colors } from "../../../infrastructure/theme/colors";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

const ModalWrapper = styled(Modal).attrs({
  contentContainerStyle: {
    backgroundColor: "white",
    marginLeft: 20,
    marginRIght: 20,
    padding: 15,
    borderRadius: 20
  },
})``;

export const CalendarModal = ({ visible, hideModal }) => {
  const { chosenDate, handleDateChange } = useContext(JournalContext);

  const handleDayPress = (dateInfo) => {
    console.log(dateInfo), handleDateChange(dateInfo);
    hideModal();
  };
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <ModalWrapper visible={visible} onDismiss={hideModal} animationType="slide" transparent="false">
      <Calendar
        theme={{
          selectedDayBackgroundColor: colors.brand.primary,
          arrowColor: colors.brand.primary,
          todayTextColor: colors.brand.primary,
          todayButtonFontWeight: "900",
        }}
        //date minimal
        minDate="2022-01-01"
        onDayPress={(e) => {
          handleDayPress(e);
        }}
        current={`${chosenDate.year}-${
          chosenDate.month > 9 ? chosenDate.month : `0${chosenDate.month}`
        }-${chosenDate.day > 9 ? chosenDate.day : `0${chosenDate.day}`}`}
      />
    </ModalWrapper>
  );
};
