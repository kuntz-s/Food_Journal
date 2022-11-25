import React, {useContext} from "react";
import { View, Text } from "react-native";
import { JournalContext } from "../../../services/journal/JournalContext";

export const DataDisplay = () => {
    const {isLoading , nutritionInfo} = useContext(JournalContext);
    if(nutritionInfo.length === 0){
        return(
            <View>
                <Text>{isLoading?"loading" : "pas trouvé"}</Text>
            </View>
        )
    } else {
        return(
            <View>
            <Text> {isLoading?"loading" : " trouvé"}</Text>
        </View> 
        )
    }
}