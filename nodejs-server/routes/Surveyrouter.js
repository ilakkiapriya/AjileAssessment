const express = require('express');
const Surveyrouter = express.Router();
const EventCollection = require('../models/EventCollection');
const QuestionCollection = require('../models/QuestionCollection');

function arrayContainsArray (superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  
Surveyrouter.get('/:eventName', async (req,res) => {
    console.log("GET on events is received on the server for event" , req.params.eventName);
    
    try {
        var eventQuery = {eventName: req.params.eventName};
        const eventVal = await EventCollection.findOne(eventQuery);
        var quesQuery = {parentTag: eventVal.surveyType};
        const quesVal = await QuestionCollection.find(quesQuery);

        console.log("Ques Value " , quesVal);
        var questionsArr = [];
        var i;
        for (i = 0; i < quesVal.length; i++) {
            if ( arrayContainsArray(quesVal[i].taggedTo, eventVal.targetedRoles) === true) {
                questionsArr.push(quesVal);  
          }
        }
        
        console.log("GET result on ques is " , questionsArr);
        res.json(questionsArr);

    } catch (err) {
        res.json({message:err});
    }
    
});


Surveyrouter.post('/', (req,res) => {
    console.log("POST on events is received on the server" , req.body);

    const events = new EventCollection (req.body);
            
    events.save().then(data => {res.json(data);}).catch( err => {res.json({message: err});
        });

    console.log("POST is completed on the server" , req.body);
});

module.exports = Surveyrouter;