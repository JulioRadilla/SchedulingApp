const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nocache = require('nocache');
//It adds the session property to the Express request object (req).
const session = require('express-session');
const homeRoutes = require('./routes/home.js');


const app = express();

//Enviroment Variables
require('dotenv').config({ path: './.env' });

//Middleware
//Allow server to accept json as a body of request
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors()); 
app.use(express.static(path.join(__dirname, '..' ,'frontend', 'public')));
// Parse 'application/x-www-form-urlencoded' requests, making form data available in req.body
app.use(express.urlencoded({ extended: true }));
//nocache middleware to disable caching for all routes
// This is crucial when using sessions for user authentication to prevent security risks
app.use(nocache());
// Set up session management
app.use(session({
    // Secret key for session cookie encryption
    secret: 'keyboard cat',
    // Avoid unnecessary session saves
    resave: false,
    // Avoid saving uninitialized sessions
    saveUninitialized: false
}))

//Routes
app.use('/', homeRoutes);
app.use('*', (req,res) => { 
    //Any other route that is not handled by our server
    //Add an error page for routes that dont exist on our server
    res.status(404).json({error: "not found"})
})

//Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Server connected to database');
        app.listen(process.env.PORT, ()=> {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        });

    })
    .catch((error) => {
        console.log(error)
    })