const express = require('express');
const Associaterouter = express.Router();
const AssociateCollection = require('../models/AssociateCollection');

Associaterouter.get('/', async (req,res) => {
    console.log("GET on Associates is received on the server" , req.body);
    try {
        const allAssociates = await AssociateCollection.find();
        res.json(allAssociates);
        console.log("GET result on Associates is " , allAssociates);
    } catch (err) {
        res.json({message:err});
    }
});


Associaterouter.post('/', (req,res) => {
    console.log("POST on Associates is received on the server" , req.body);

    const Associate = new AssociateCollection (req.body);
            
      Associate.save().then(data => {res.json(data);}).catch( err => {res.json({message: err});
        });

    console.log("POST is completed on the server" , req.body);
});

module.exports = Associaterouter;