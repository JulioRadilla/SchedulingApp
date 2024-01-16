const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const { isAuthenticated } = require('../middleware/authorization.js');
//Might create a folder to handle the signUp 
// Protected routes have isAuthenticated middleware to ensure 
// that only authenticated users can access these routes.
router.post('/signUpForm', homeController.signUpUser);
router.get('/', homeController.getLandingPage);
router.get('/home', isAuthenticated, homeController.getHomePage);
router.get('/create-task', isAuthenticated, homeController.getCreateTaskPage);
router.get('/login', homeController.getLoginPage);
router.get('/signup', homeController.getSignUpFormPage);
router.post('/login', homeController.loginUser)

module.exports = router;