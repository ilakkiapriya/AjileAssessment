const express = require('express');
const Trainrouter = express.Router();
const TrainsModel = require('../models/TrainCollection');

Trainrouter.get('/', (req,res) => {
    console.log("Home link is clicked");
    res.send('We are on home');
});

Trainrouter.get('/trains', async (req,res) => {
    console.log("GET on trains is received on the server" , req.body);

    try {
        const trains = await TrainsModel.find();
        res.json(trains);
        console.log("GET result on trains is " , trains);

    } catch (err) {
        res.json({message:err});
    }
});

Trainrouter.get('/trains/:trainId', async (req, res) => {
    try {
        const train = await TrainsModel.findById(req.params.trainId);
        res.json(train);
    } catch (err) {
        res.json({message:err});
    }
});

Trainrouter.post('/trains', (req,res) => {
    const train = new TrainsModel ({
            trainName: req.body.trainName,
            trainDesc: req.body.trainDesc,
            trainOwner: req.body.trainOwner,
            teams: req.body.teams
        });
            
        train.save().then(data => {res.json(data);}).catch( err => {res.json({message: err});
        });

    console.log("POST is completed on the server" , req.body);
});

Trainrouter.patch('/trains/:trainId', async (req,res) => {
    try {
        console.log("Request body is " + req.body);
        const updateTrain = await TrainsModel.updateOne( { _id: req.params.trainId}, 
        { $set: req.body }
        );
        res.json(updateTrain);
    }
    catch (err) {
        res.json({message: err});
    }
})


module.exports = Trainrouter;