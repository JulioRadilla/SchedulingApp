const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nocache = require('nocache');
const homeRoutes = require('./routes/home.js');


const app = express();

//Enviroment Variables
require('dotenv').config({ path: './.env' });

//Middleware
app.use(express.json()); //Allow server to accept json as a body of request
app.use(cors()); 
app.use(express.static(path.join(__dirname, '..' ,'frontend', 'public')));
app.use(express.urlencoded({ extended: true }));
//nocache middleware to disable caching for all routes
app.use(nocache());

//Routes
app.use('/', homeRoutes);
app.use('*', (req,res) => { //Any other route that is not handled by our server
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