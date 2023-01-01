import { colorsList } from "../../../components/utility/colors";

export const sortDatabaseList = (dataList) => {
    let newDataList = dataList.sort((a,b) => { const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
      
        // names must be equal
        return 0;})
    return newDataList;
}



export const getFoodsCount = (newFoodsList) => {
  let result = [];
  let rand = Math.floor(Math.random() * 1300);
  result = [...result, {...newFoodsList[0], color:colorsList[rand].hex, legendFontColor:"#7F7F7F", legendFontSize:15}];
  for (let i = 1; i < newFoodsList.length; i++) {
    if (
      newFoodsList[i].name.toUpperCase() ===
      newFoodsList[i - 1].name.toUpperCase()
    ) {
        const ind = result.findIndex((elt) => elt.name.toUpperCase() === newFoodsList[i].name.toUpperCase());
       
        result[ind] = {...result[ind], timesEaten: result[ind].timesEaten + newFoodsList[i].timesEaten};
    } else {
      rand = Math.floor(Math.random() * 1300);
      result = [...result, {...newFoodsList[i], color:colorsList[rand].hex, legendFontColor:"#7F7F7F", legendFontSize:15}];
    }
  }
  //console.log(result);
  return result;
};

export const getDrinksCount = (newDrinksList ) => {
  let result = [];
  let rand = Math.floor(Math.random() * 1300);
  result = [...result, {...newDrinksList[0], color:colorsList[rand].hex, legendFontColor:"#7F7F7F", legendFontSize:15}];
  for (let i = 1; i < newDrinksList.length; i++) {
    if (
      newDrinksList[i].name.toUpperCase() ===
      newDrinksList[i - 1].name.toUpperCase()
    ) {
        const ind = result.findIndex((elt) => elt.name.toUpperCase() === newDrinksList[i].name.toUpperCase());
       
        result[ind] = {...result[ind], quantity: result[ind].quantity + newDrinksList[i].quantity};
    } else {
      rand = Math.floor(Math.random() * 1300);
      result = [...result, {...newDrinksList[i], color:colorsList[rand].hex, legendFontColor:"#7F7F7F", legendFontSize:15}];
    }
  }
  return result;
}

export const getDrinksQuantity = (data) => {
  let filteredWaterData = data.filter((elt) => elt.name==="eau");
  let filteredDrinkData = data.filter((elt) => elt.name!=="eau");
  let waterResult=0;
  let drinkResult = 0;
  for(let water of filteredWaterData){
    waterResult +=  water.quantity;
  }

  for(let drink of filteredDrinkData){
    drinkResult += drink.quantity;
  }
  return {water: waterResult, drink: drinkResult};
}

