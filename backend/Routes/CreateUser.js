const express = require('express')
const User = require('../models/User')
const bcrypt = require("bcrypt")
const { body, validationResult } = require('express-validator')
const router = express.Router()
const jwt = require('jsonwebtoken');

const jwtSecret="00312992438758e4b42d877a4dc93a7445c54ce0c92fae73736e6644abc1bcfc8a2cb1681fd137dada2ee1147618d47d78e02fbc76067f459c3f518267d99e82";

//this all sitting for signup
router.post(
  "/creatuser",
  [
    // Validation middleware to check email, name, and password
    body('email').isEmail().withMessage('Invalid email address'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    try {
      // Validate the request using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      // Generate a salt and hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      // Create a new user document in your database
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: hashedPassword, // Store the hashed password
        email: req.body.email,
      });

      // Respond with a success message
      res.status(200).json({ message: true });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(400).json({ message: false });
    }
  }
);

//login 
router.post("/loginuser",
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(404).json({ msg: "User Not Login Try Agin" })
      }
      // Compare the provided password with the hashed password in the database
    let isPasswordValid = await bcrypt.compare(req.body.password, userData.password);

    if (!isPasswordValid) {
      return res.status(404).json({ msg: "Invalid Password" });
    }
    
    const expiresIn = 3600; // Token expires in 1 hour (you can adjust this value as needed)

const data = {
  user: {
    id: userData.id,
  },
};

const authToken = jwt.sign(data, jwtSecret, { expiresIn });

// Log the generated token
console.log("Token Successfully Generated:", authToken);

return res.status(200).json({ message: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: false });
    }
  });


module.exports = router;