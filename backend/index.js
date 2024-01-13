const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const homeRoutes = require('./routes/home.js');


const app = express();

//Enviroment Variables
require('dotenv').config({ path: './.env' });

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', homeRoutes);

//Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, ()=> {
            console.log(`App is listening to port: ${process.env.PORT}`)
        });

    })
    .catch((error) => {
        console.log(error)
    })