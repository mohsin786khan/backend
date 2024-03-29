const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');



// set config path to load env variables
dotenv.config({ path: './config/config.env' });

// connect to database
 connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

 // body parser
 app.use(express.json());

 // Dev logging middleware
 if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
  }

  // File uploading
  app.use(fileupload());
 
 
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

  // Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

  app.use(errorHandler);


  const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT,
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold) );


  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
   // Close server & exit process
  server.close(() => process.exit(1));
  });

