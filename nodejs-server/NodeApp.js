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
const associaterouter = require('./routes/Associaterouter');
const eventrouter = require('./routes/Eventrouter');
const surveyrouter = require('./routes/Surveyrouter');

app.use("/", trainrouter);
app.use("/questions", questionrouter);
app.use("/associates", associaterouter);
app.use("/events",eventrouter);
app.use("/survey",surveyrouter);


 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>
{
   console.log('Connected to DB');
});

app.listen(3001, '0.0.0.0');
