import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
  createDrinkTable,
  createFoodTable,
  createNutritionTable,
} from "../../database/queries";

let actual = new Date();
const db = SQLite.openDatabase("db.db");

export const JournalContext = createContext();

export const JournalContextProvider = ({ children }) => {
  const [chosenDate, setChosenDate] = useState({
    day: actual.getDate(),
    month: actual.getMonth() + 1,
    year: actual.getFullYear(),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState([]);

  useEffect(() => {
    const getNutritionInfo = () => {
      setIsLoading(true);
      let queryDate = `${chosenDate.year}-${chosenDate.month}-${chosenDate.day}`;
      db.transaction((txn) => {
        txn.executeSql(
          `SELECT 
            nutrition.id,
            nutrition.jour,
            nutrition.fruits,
            nutrition.vegetables, 
            nutrition.bowelMovement,
            nutrition.isHealthy,
            nutrition.reason,
            food.name as foodName,
            food.timesEaten,
            drink.name,
            drink.quantity
          FROM nutrition 
            INNER JOIN drink on nutrition.id = drink.nutritionId  
            INNER JOIN food on nutrition.id = food.nutritionId  
          WHERE nutrition.jour = ? ;
          `,
          [queryDate],
          (sqlTxn, res) => {
            console.log(res.rows);
            setNutritionInfo(res.rows._array);
            setIsLoading(false);
            setIsError(null);
          },
          (error) => {
            setIsError(error.message);
            setIsLoading(false);
          }
        );
      });
    };
    getNutritionInfo();
  }, [chosenDate]);

  //sqlite create table
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

      //create Drink Table
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

      //create food table
      txn.executeSql(
        createFoodTable,
        [],
        (sqlTxn, res) => {
          console.log("food table created successfuly");
        },
        (error) => {
          console.log(
            "an error occured when creating the table" + error.message
          );
        }
      );
    });
  };

  const handleDateChange = (dateInfo) => {
    console.log(dateInfo);
    setChosenDate({
      day: dateInfo.day,
      month: dateInfo.month,
      year: dateInfo.year,
    });
  };

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <JournalContext.Provider
      value={{
        chosenDate,
        isModalVisible,
        isLoading,
        isError,
        nutritionInfo,
        handleDateChange,
        showModal,
        hideModal,
        createTables,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
