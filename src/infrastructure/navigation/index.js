import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { JournalNavigator } from "./JournalNavigator";

export const Navigation = () => {


    return (
        <NavigationContainer>
            <JournalNavigator/> 
        </NavigationContainer>
    )
}