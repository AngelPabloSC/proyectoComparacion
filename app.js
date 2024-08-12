const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shoesRouter = require('./routes/shoesRouter.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', shoesRouter);


module.exports = app;