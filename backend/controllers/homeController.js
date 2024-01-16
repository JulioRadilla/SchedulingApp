const path = require('path');
const User = require('../models/userModel.js')

module.exports = {
    getLandingPage: async (req,res) => {
        try {
            res.sendFile(path.join(__dirname, '../../frontend/public/index.html'))
        } catch (error) {
            console.log(error.message);
            res.status(500).send({message: error.message})
        }
    },
    getHomePage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/homePage/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getCreateTaskPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/createTask/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getLogInPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/logIn/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getSignUpFormPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/signUpForm/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    signUpUser: async (req,res) =>{
      try {
        const formData = req.body;

        // Process the form data as needed
        console.log('Received form data:', formData);

         // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: formData.email });

        if (existingUser) {
          // Handle duplicate email entry
          return res.status(400).send({ message: 'Email already in use' });
        }

        // Create a new user instance using the Mongoose model
        const newUser = new User(formData);

        // Save the user to the database
         await newUser.save();

        // Redirect to the home page or send a success response
        res.redirect('/home'); 
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
   /* loginUser: async (req,res) => {

    }*/
}