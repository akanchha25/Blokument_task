
const express = require('express');
const { json } = require("express");
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)MIDDLEWARE
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}

app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`)); // built-in middleware to serve static files . Now go in browser and open this URL http://127.0.0.1:3000/overview.html

//creating our own middleware
app.use((req, res, next) =>{
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/api/v1/tours',tourRouter); //tourRouter is middleware function and this is known as mounting the router
app.use('/api/v1/users',userRouter);


// 4) SERVER

module.exports = app;
