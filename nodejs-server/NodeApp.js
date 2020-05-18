const mongoose = require('mongoose');
require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//import routers
const trainrouter = require('./routes/trainrouter');
app.use("/", trainrouter);
 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>
{
   console.log('Connected to DB');
});

app.listen(3001);
