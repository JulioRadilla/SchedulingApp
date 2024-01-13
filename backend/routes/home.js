const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js')

router.post('/signUp', homeController.signUpUser);
router.post('/logIn', homeController.logInUser)

module.exports = router;