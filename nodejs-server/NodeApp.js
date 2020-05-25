const mongoose = require('mongoose');
require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//import routers
const trainrouter = require('./routes/Trainrouter');
const questionrouter = require('./routes/Questionrouter');

app.use("/", trainrouter);
app.use("/questions", questionrouter);

 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>
{
   console.log('Connected to DB');
});

app.listen(3001, '0.0.0.0');
