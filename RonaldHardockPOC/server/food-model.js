
// Singleton class to manage food data
class FoodModel {
  constructor() {
    if (!FoodModel.instance) {
      // Init the food items in the model
      this.foods = [
        { id: 1, name: "Pepperoni Pizza", price: 14.00 },
        { id: 2, name: "Garden Salad", price: 8.00 },
        { id: 3, name: "Cheeseburger", price: 10.00 },
        { id: 4, name: "Chicken Fingers", price: 10.00 },
        { id: 5, name: "Veggie Wrap", price: 9.00 }
      ];
      FoodModel.instance = this; // Store the instance
    }
    return FoodModel.instance; // Return the singleton instance
  }

  // Method to retrieve all food items
  getAll() {
    console.log("FoodModel: Retrieving all food items...");
    return this.foods;
  }
}

const instance = new FoodModel();
Object.freeze(instance); // Freeze the instance to prevent modifications

module.exports = instance;
