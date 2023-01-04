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
  const [isSubmitLoading,setIsSubmitLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [dataList , setDataList] = useState([]);
  const [nutritionInfo, setNutritionInfo] = useState([]);

  useEffect(() => {
    const getNutritionInfo = () => {
      setIsLoading(true);
      let queryDate = `${chosenDate.year}-${chosenDate.month}-${chosenDate.day}`;
      db.transaction((txn) => {
        txn.executeSql(
          `SELECT 
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
            LEFT JOIN drink on nutrition.jour = drink.nutritionId  
            LEFT JOIN food on nutrition.jour = food.nutritionId  
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

        txn.executeSql(
          `SELECT * FROM nutrition  ;
          `,
          [],
          (sqlTxn, res) => {
            setDataList(res.rows._array);
          },
          (error) => {
            setIsError(error.message);
            setIsLoading(false);
          }
        );

        
      });
    };
    getNutritionInfo();
  }, [chosenDate, isSubmitLoading]);

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

  
  /**
   *  {"bowelMovement": 0, "drinksList": [{"drinkName": "Jus", "quantity": "0.9"}], "foodsList": [{"foodName": "riz sauté", "timesEaten": "2"}], "fruitsEaten": true, "healthReason": "Ventre", "isHealthy": false, "vegetablesEaten": true, "waterQuantity": "0.6"}
   */
  const insertData =  (data) => {
    let queryDate = `${chosenDate.year}-${chosenDate.month }-${chosenDate.day}`;
    data.drinksList.push({drinkName:"eau", quantity:data.waterQuantity})
    setIsSubmitLoading(true);
    db.transaction((txn) => {
       // inserting into nutrition
       txn.executeSql(
          `INSERT INTO nutrition (jour, fruits, vegetables , bowelMovement, isHealthy, reason) VALUES (?,?,?,?,?,?)`,
          [queryDate,data.fruitsEaten, data.vegetablesEaten, data.bowelMovement, data.isHealthy , data.healthReason ],
          (sqlTxn, res) => {
            console.log("insertion successful into nutrition");
          },
          (error) => {
           setIsError("une erreur est surevenue lors de l'insertion dans la table nutrition", error.message);
           setIsSubmitLoading(false);
          }
        );
  
         //inserting into drinks
       if(data.drinksList.length > 0){
         for(let drinkItem of data.drinksList){
          txn.executeSql(
            `INSERT INTO drink (name, quantity, nutritionId) VALUES(?,?,?)`,
            [drinkItem.drinkName, drinkItem.quantity , queryDate],
            (sqlTxn, res) => {
              console.log( `drink inserted successfuly`);
            },
            (error) => {
              console.log(
                "Un erreur est survenue lors de l'insertion de la table drink" + error.message
              );
              setIsSubmitLoading(false);
            }
          );
        }
       }
  
        //inserting into food
      if(data.foodsList.length > 0){
        for(let foodItem of data.foodsList){
          txn.executeSql(
            `INSERT INTO food (name, timesEaten, nutritionId) VALUES(?,?,?)`,
            [foodItem.foodName, foodItem.timesEaten , queryDate],
            (sqlTxn, res) => {
              console.log( `food inserted successfuly`);
            },
            (error) => {
              console.log(
                "une erreur survenue lors de l'insertion de la table food" + error.message
              );
               setIsSubmitLoading(false);
                 }
          );
         }
      }
      setIsSubmitLoading(false);
      });
  }

  const deleteData = () => {
    let queryDate = `${chosenDate.year}-${chosenDate.month }-${chosenDate.day}`;
    setIsSubmitLoading(true);
    db.transaction((txn) => {
       // inserting into nutrition
       txn.executeSql(
          `DELETE FROM drink WHERE nutritionId = ?`,
          [queryDate],
          (sqlTxn, res) => {
            console.log("deletion successful into drink");
          },
          (error) => {
           setIsError("une erreur est surevenue lors de la suppression dans la table drink", error.message);
           setIsSubmitLoading(false);
          }
        );

        txn.executeSql(
          `DELETE FROM food WHERE nutritionId = ?`,
          [queryDate],
          (sqlTxn, res) => {
            console.log("deletion successful into food");
          },
          (error) => {
           setIsError("une erreur est surevenue lors de la suppression dans la table food", error.message);
           setIsSubmitLoading(false);
          }
        );

        txn.executeSql(
          `DELETE FROM nutrition WHERE jour = ?`,
          [queryDate],
          (sqlTxn, res) => {
            console.log("deletion successful into nutrition");
          },
          (error) => {
           setIsError("une erreur est surevenue lors de la suppression dans la table nutrition", error.message);
           setIsSubmitLoading(false);
          }
        );
        setIsSubmitLoading(false);
      
    })
  }

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
        isSubmitLoading,
        dataList,
        handleDateChange,
        showModal,
        hideModal,
        createTables,
        insertData,
        deleteData
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
