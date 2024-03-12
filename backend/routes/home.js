const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const { isAuthenticated } = require('../middleware/authorization.js');
//Might create a folder to handle the signUp 
// Protected routes have isAuthenticated middleware to ensure 
// that only authenticated users can access these routes.
router.get('/', homeController.getLandingPage);
router.get('/home', isAuthenticated, homeController.getHomePage);
router.get('/create-task', isAuthenticated, homeController.getCreateTaskPage);
router.get('/profile', isAuthenticated, homeController.getProfilePage);
router.get('/login', homeController.getLoginPage);
router.get('/signup', homeController.getSignUpFormPage);
// Fetch the tasks by date based on what the date the user selects
router.get('/fetch-tasks', homeController.getTaskByDate)
router.post('/logout', homeController.logoutUser);
router.post('/login', homeController.loginUser);
router.post('/signUpForm', homeController.signUpUser);
router.post('/create-task', homeController.createTask);
router.put('/updateUserProfile', homeController.updateUserProfile);
router.delete('/delete-task', homeController.deleteTask);

/*
Create- POST
Read- GET
Update - PUT 
Delete - DELETE
*/

module.exports = router;