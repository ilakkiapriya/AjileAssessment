const express = require('express');
const Eventrouter = express.Router();
const EventCollection = require('../models/EventCollection');

Eventrouter.get('/', async (req,res) => {
    console.log("GET on events is received on the server" , req.body);
    try {
        const allEvents = await EventCollection.find();
        res.json(allEvents);
        console.log("GET result on events is " , allEvents);
    } catch (err) {
        res.json({message:err});
    }
});


Eventrouter.post('/', (req,res) => {
    console.log("POST on events is received on the server" , req.body);

    const events = new EventCollection (req.body);
            
    events.save().then(data => {res.json(data);}).catch( err => {res.json({message: err});
        });

    console.log("POST is completed on the server" , req.body);
});

module.exports = Eventrouter;