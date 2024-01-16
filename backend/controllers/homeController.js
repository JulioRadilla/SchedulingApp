const path = require('path');
const User = require('../models/usersModel.js')
const bcrypt = require('bcrypt');

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
    getLoginPage: async (req, res) => {
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

        //Hash password before storing in database 
        const newUser = new User({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          // Hash the password
          password: await bcrypt.hash(formData.password, 10), // 10 is the number of salt rounds
        });

        // Process the form data as needed
        console.log('Data updated after hashing password:', newUser);

        // Save the user to the database
        await newUser.save();

        // Store user information in the session
        req.session.user = { id: newUser._id, email: newUser.email, fullName: newUser.fullName };

        // Redirect to the home page or send a success response
        res.redirect('/home'); 
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
    loginUser: async (req,res) => {
      try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store user information in the session
        req.session.user = { id: user._id, email: user.email, fullName: user.fullName };

    
        res.redirect('/home');
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    }
}