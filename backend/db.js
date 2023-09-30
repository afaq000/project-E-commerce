const mongoose = require('mongoose');
const URL = 'mongodb+srv://admin:admin111@cluster0.iq1btm0.mongodb.net/gofoodmern?retryWrites=true&w=majority'
async function mongoDB() {
  try {
    // Connect to MongoDB using the provided URL
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Fetch data from the "food_items" collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const food_items = await foodItemsCollection.find({}).toArray();

    // Fetch data from the "foodCategory" collection
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    // Store the fetched data in global variables for later use
    global.food_items = food_items;
    global.foodCategory = foodCategory;

    // console.log("Data fetched:", global.food_items, global.foodCategory);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = mongoDB;
