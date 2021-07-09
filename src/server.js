'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handler/404.js');
const errorHandler = require('./error-handler/500.js');
const router=require('./data/router');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/',router);



app.use('*',notFoundHandler);
app.use(errorHandler);



module.exports = {
    server: app,
    start: port => {
      if (!port) { throw new Error("Missing Port"); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };