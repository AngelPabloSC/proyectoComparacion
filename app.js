const express = require('express');
const bodyParser = require('body-parser');
const shoesRouter = require('./routes/shoesRouter.js');

const app = express();

app.use(bodyParser.json());
app.use('/api', shoesRouter);


module.exports = app;