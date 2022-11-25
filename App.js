import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOpenSans,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { theme } from "./src/infrastructure/theme/index.js";
import { JournalContextProvider } from "./src/services/journal/JournalContext.js";
import { JournalScreen } from "./src/features/journal/JournalScreen.js";
//import { View, Text } from "react-native";

export default function App() {
  const [openSansLoaded] = useOpenSans({ OpenSans_400Regular });
  const [robotoLoaded] = useRoboto({ Roboto_400Regular });

  if (!robotoLoaded || !openSansLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <JournalContextProvider>
          <JournalScreen />
        </JournalContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}

/*import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import {TextInput, Button} from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { createNutritionTable, createFoodTable, createDrinkTable } from "./src/database/queries";

const db = SQLite.openDatabase("db.db");

export default function App() {
  const [categories , setCategories] = useState(null);
  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        createNutritionTable,
        [],
        (sqlTxn, res) => {
          console.log("nutrition table create successfuly");
        },
        (error) => {
          console.log(
            "an error occured when creating the table" + error.message
          );
        }
      );

      //other insertion
      txn.executeSql(
        createDrinkTable,
        [],
        (sqlTxn, res) => {
          console.log("drink table create successfuly");
        },
        (error) => {
          console.log(
            "an error occured when creating the table" + error.message
          );
        }
      );

      //other insertion
      txn.executeSql(
        createFoodTable,
        [],
        (sqlTxn, res) => {
          console.log("food table create successfuly");
        },
        (error) => {
          console.log(
            "an error occured when creating the table" + error.message
          );
        }
      );
    });
  };

  useEffect(() => {
    createTables();
  }, []);

  const handleCategories = () => {
    if(!categories){
      alert("Enter category");
      return false;
    }
    //SELECT name FROM sqlite_master WHERE type='table';
    //PRAGMA table_info('nutrition') ;
    db.transaction((txn) => {

     
    txn.executeSql(
        `PRAGMA table_info('drink');`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if(len > 0){
            let result = [];
            for( let i = 0 ; i < len ; i++){
              let item = res.rows.item(i);
              result.push({ name:item.name});

            }
            console.log(result);
          }
          console.log("table dropped successfully");
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );

     // inserting into nutrition
      txn.executeSql(
        `INSERT INTO nutrition (jour, fruits, vegetables , bowelMovement, isHealthy, reason) VALUES (?,?,?,?,?,?)`,
        ["2022-11-24",true, false, 4, true , "aucune" ],
        (sqlTxn, res) => {
          console.log( `nutrition inserted successfuly`);
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );

      //inserting into drinks
      txn.executeSql(
        `INSERT INTO drink (name, quantity, nutritionId) VALUES(?,?,?)`,
        ["bière", 0.85 , 1],
        (sqlTxn, res) => {
          console.log( `drink inserted successfuly`);
          getDrinkList();
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );

      //inserting into food
      txn.executeSql(
        `INSERT INTO food (name, timesEaten, nutritionId) VALUES(?,?,?)`,
        ["couscous légumes", 1 , 1],
        (sqlTxn, res) => {
          console.log( `food inserted successfuly`);
          getFoodList();
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );
    });
  }

  const getCategories = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM nutrition ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log( `nutrition retrieved successfuly`);
          let len = res.rows.length;
          if(len > 0){
            let result = [];
            for( let i = 0 ; i < len ; i++){
              let item = res.rows.item(i);
              result.push({id: item.id, jour:item.jour ,fruits: item.fruits, vegetables : item.vegetables, bowel:item.bowelMovement, healthy: item.isHealthy, reason:item.reason});

            }
            console.log(result);
          }
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );
    });
  }

  const getDrinkList = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM drink ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if(len > 0){
            let result = [];
            for( let i = 0 ; i < len ; i++){
              let item = res.rows.item(i);
              result.push({id: item.id, name:item.name, quantity: item.quantity, nutritionId: item.nutritionId});

            }
            console.log(result);
          }
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );
    });
  }

  
  const getFoodList = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM food ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if(len > 0){
            let result = [];
            for( let i = 0 ; i < len ; i++){
              let item = res.rows.item(i);
              result.push({id: item.id, name:item.name, timesEaten: item.timesEaten, nutritionId: item.nutritionId});

            }
            console.log(result);
          }
        },
        (error) => {
          console.log(
            "an error occured when inserting into the table" + error.message
          );
        }
      );
    });
  }



  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", padding:20}}>
        <TextInput
              onChangeText={(text) => setCategories(text)}
              style={{maxHeight:70, width:"100%", marginBottom:4}}
              placeholder="select the category"
              value={categories}
            />
          <Button 
          icon="lock-open-outline"
          mode="contained"
          onPress={handleCategories}>
            Ajout
          </Button>
          
    </View>
  );
}*/
