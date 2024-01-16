const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js')
//Might create a folder to handle the signUp 
router.post('/signUpForm', homeController.signUpUser);
router.get('/', homeController.getLandingPage);
router.get('/home', homeController.getHomePage);
router.get('/create-task', homeController.getCreateTaskPage);
router.get('/login', homeController.getLogInPage);
router.get('/signup', homeController.getSignUpFormPage);
//router.post('/logIn', homeController.logInUser)

module.exports = router;