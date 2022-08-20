const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


// Route files
const bootcamps = require('./routes/bootcamps');


// set config path to load env variables
dotenv.config({ path: './config/config.env' });



const app = express();

const logger = (req, res, next) => {
  req.hello = 'Hellow World';
  console.log('middleware run');
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalURL}`)
  next();
};

app.use(logger);

// Dev logging middleware
//if (process.env.NODE_ENV === 'development') {
  //  app.use(morgan('dev'));
  //}


// Mount routers
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log(`server is running in ${process.env.NODE_ENV} mode on ${PORT} port`) );