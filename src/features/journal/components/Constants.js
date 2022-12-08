export const textDisplay = (value) => {
  const returnValue = {
    fruits: [
      "Vous n'avez mangé aucun fruit cette journée",
      "Vous avez mangé des fruits en cette journée",
    ],
    vegetables: [
      "Vous n'avez mangé aucun légumes cette journée",
      "Vous avez mangé des légumes en cette journée",
    ],
    bowel: [
      "Vous n'ètes pas allé aux toilettes cette journée",
      `Vous ètes allé aux toilettes ${value && value} fois cette journée`,
    ],
    water: [
      "Vous n'avez pas bu d'eau cette journée",
      `Vous avez bu ${value && value} litres d'eau cette journée`,
    ],
    drinks: [
      "Vous n'avez pas aucune boisson autre que de l'eau cette journée",
      `Vous avez bu au total ${
        value && value
      } litres de boissons autre que de l'eau cette journée`,
    ],
    food: [
      "Vous n'avez pas consommé de repas cette journée",
      `Vous avez consommé ${value && value} repas cette journée`,
    ],
    health: [
      `Problème de santé signalé : ${value && value}`,
      `Aucun problème de santé signalé cette journée`,
    ],
  };
  return returnValue;
};

//verifier si les données ne sont pas null
const isFoodValuesNull = (nutritionData) => {
  let res = true;
  for (let data of nutritionData) {
    if (data.foodName && data.timesEaten) {
      res = false;
      break;
    }
  }
  return res;
};

const isDrinkValuesNull = (nutritionData) => {
  let res = true;
  for (let data of nutritionData) {
    if (data.name && data.quantity) {
      res = false;
      break;
    }
  }
  return res;
};

//trier la base de données pour uniquement ressortir les boissons
export const getUniqueDrinks = (nutritionData) => {
  let drinksList = [];
  if (isDrinkValuesNull(nutritionData)) {
    return drinksList;
  }
  let temp;
  for (let nutrition of nutritionData) {
    temp = filterDrink(drinksList, nutrition);
    if (!temp) {
      let { name, quantity } = nutrition;
      drinksList.push({ name, quantity });
    }
  }
  // console.log(drinksList);
  return drinksList;
};

//trier la base de données pour uniquement ressortir la liste des nourritures
export const getUniqueFoods = (nutritionData) => {
  let foodsList = [];
  if (isFoodValuesNull(nutritionData)) {
    return foodsList;
  }
  let temp;
  for (let nutrition of nutritionData) {
    temp = filterFood(foodsList, nutrition);
    if (!temp) {
      let { foodName, timesEaten } = nutrition;
      foodsList.push({ foodName, timesEaten });
    }
  }
  // console.log(foodsList);
  return foodsList;
};
const filterDrink = (drinksList, nutrition) => {
  return drinksList.find(
    (drink) =>
      drink.name === nutrition.name && drink.quantity === nutrition.quantity
  );
};
const filterFood = (foodsList, nutrition) => {
  return foodsList.find(
    (food) =>
      food.foodName === nutrition.foodName &&
      food.timesEaten === nutrition.timesEaten
  );
};

//avoir la quantité d'eau bue
export const getWaterQuantity = (nutritionData) => {
  let quantity = 0;
  let waterInfo = getUniqueDrinks(nutritionData).find(
    (drink) => drink.name === "eau"
  );
  if (waterInfo) {
    if (waterInfo.quantity) {
      quantity = waterInfo.quantity;
    }
  }
  return quantity;
};

//avoir la quantité d'autre boisson bu
export const getOtherDrinksQuantity = (nutritionData) => {
  let quantity = 0;
  if (isDrinkValuesNull(nutritionData)) {
    return quantity;
  }
  let uniqueDrinks = getUniqueDrinks(nutritionData).filter(
    (drink) => drink.name !== "eau"
  );
  if (uniqueDrinks.length === 0) {
    return quantity;
  }
  for (let drink of uniqueDrinks) {
    quantity += drink.quantity;
  }
  return quantity;
};

/**
 * {"_array": [{"bowelMovement": 0, "foodName": null, "fruits": 1, "isHealthy": 1, "jour": "2022-11-3", "name": null, "quantity": null, "reason": null, "timesEaten": null, "vegetables": 0}], "length": 1}
 */

/**
 * [{"bowelMovement": 4, "foodName": "okok salé", "fruits": 1, "isHealthy": 1, "jour": "2022-11-20", "name": null, "quantity": null, "reason": null, "timesEaten": 2, "vegetables": 0}, {"bowelMovement": 4, "foodName": "okok sucré", "fruits": 1, "isHealthy": 1, "jour": "2022-11-20", "name": null, "quantity": null, "reason": null, "timesEaten": 3, "vegetables": 0}, {"bowelMovement": 4, "foodName": "pain chocolat", "fruits": 1, "isHealthy": 1, "jour": "2022-11-20", "name": null, "quantity": null, "reason": null, 
"timesEaten": 1, "vegetables": 0}]
 */

//{"drinksList": [], "foodsList": [{"foodName": "Pain", "timesEaten": "1"}, {"foodName": "Gateau", "timesEaten": "2"}], "fruitsEaten": true, "waterQuantity": "0.9"}
