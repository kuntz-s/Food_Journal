export const createNutritionTable = `CREATE TABLE IF NOT EXISTS nutrition ( jour DATE PRIMARY KEY,fruits BOOLEAN ,vegetables BOOLEAN, bowelMovement INTEGER , isHealthy BOOLEAN, reason VARCHAR(20));`;

export const createFoodTable = `CREATE TABLE IF NOT EXISTS food (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(200) NOT NULL, timesEaten INTEGER NOT NULL, nutritionId INTEGER NOT NULL, FOREIGN KEY(nutritionId) REFERENCES nutrition(jour));`

export const createDrinkTable = `CREATE TABLE IF NOT EXISTS drink (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(200) NOT NULL, quantity REAL NOT NULL,nutritionId INTEGER NOT NULL,  FOREIGN KEY(nutritionId) REFERENCES nutrition(jour));`

