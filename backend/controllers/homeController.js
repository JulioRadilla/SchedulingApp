const path = require('path');

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
        
        res.redirect('/home'); 
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
   /* loginUser: async (req,res) => {

    }*/
}