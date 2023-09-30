const express = require('express')
const router = express.Router()

router.post("/foodData",(req,res)=>{
    try {
        // Create an object containing both data sets
        const responseData = {
            food_items: global.food_items,
            foodCategory: global.foodCategory
        };

        // Send the object as a JSON response
        res.json(responseData);
    } catch (error) {
        console.log(error.message);
        res.send("server connected")
    }
})
module.exports = router;