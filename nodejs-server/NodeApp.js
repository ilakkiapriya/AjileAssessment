const mongoose = require('mongoose');
require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
   return res.send('pong');
  });
  
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  


//import routers
const trainrouter = require('./routes/Trainrouter');
const questionrouter = require('./routes/Questionrouter');
const associaterouter = require('./routes/Associaterouter');
const eventrouter = require('./routes/Eventrouter');
const surveyrouter = require('./routes/Surveyrouter');

app.use("/rest/trains", trainrouter);
app.use("/rest/questions", questionrouter);
app.use("/rest/associates", associaterouter);
app.use("/rest/events",eventrouter);
app.use("/rest/survey",surveyrouter);


 
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>
{
   console.log('Connected to DB');
});

app.listen(3001, '0.0.0.0');
