import express from 'express'; // Importing Express (ES Module syntax) //c
import authRouter from './routes/auth.route.js'
// const express = require('express'); 
const app = express(); // Creating an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies


app.use('/api/auth', authRouter);

app.listen(8080, () => { // Starting the app on port 8080
    console.log('app started on port 8080');
});

