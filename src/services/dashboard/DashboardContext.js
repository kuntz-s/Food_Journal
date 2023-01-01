import React, { createContext, useState, useEffect } from "react";
import { sortDatabaseList, getFoodsCount, getDrinksCount } from "../../features/dashboard/components/Constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState([]);
  const [foodsList , setFoodsList] = useState([]);
  const [drinksList , setDrinksList] = useState([]);
  const [daysNumber ,setDaysNumber] = useState(0);
  


  useEffect(() => {
    const getDatabaseInfo = () => {
      setIsLoading(true);
      db.transaction((txn) => {

        txn.executeSql(
          `SELECT * FROM nutrition; `,
          [],
          (sqlTxn, res) => {
            setDaysNumber(res.rows.length);
          },
          (error) => {
            setIsError(error.message);
            setIsLoading(false);
          }
        );

        txn.executeSql(
          `SELECT * FROM food; `,
          [],
          (sqlTxn, res) => {
            const sortedData = sortDatabaseList(res.rows._array);
            setFoodsList(getFoodsCount(sortedData));
            setIsLoading(false);
            setIsError(null);
          },
          (error) => {
            setIsError(error.message);
            setIsLoading(false);
          }
        );

        txn.executeSql(
          `SELECT * FROM drink; `,
          [],
          (sqlTxn, res) => {
            const sortedData = sortDatabaseList(res.rows._array);
            setDrinksList(getDrinksCount(sortedData));
          },
          (error) => {
            setIsError(error.message);
            setIsLoading(false);
          }
        );

       
      });

      
    };
    getDatabaseInfo();
  }, [ ]);

  return (
    <DashboardContext.Provider 
      value={{
        isLoading,
        isError,
        foodsList,
        drinksList,
        daysNumber
      }}
    > 
      {children}
    </DashboardContext.Provider>
  );
};
