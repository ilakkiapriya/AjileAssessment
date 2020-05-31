const express = require('express');
const Questionrouter = express.Router();
const QuestionCollection = require('../models/QuestionCollection');

Questionrouter.get('/', async (req,res) => {
    console.log("GET on questions is received on the server" , req.body);
    try {
        const allQuestions = await QuestionCollection.find();
        res.json(allQuestions);
        console.log("GET result on questions is " , allQuestions);
    } catch (err) {
        res.json({message:err});
    }
});

Questionrouter.get('/:taggedTo', async (req, res) => {
    try {
        const questions = await QuestionCollection.findById(req.params.taggedTo);
        res.json(questions);
    } catch (err) {
        res.json({message:err});
    }
});

Questionrouter.post('/', (req,res) => {
    console.log("POST on questions is received on the server" , req.body);

    const question = new QuestionCollection (req.body);
            
      question.save().then(data => {res.json(data);}).catch( err => {res.json({message: err});
        });

    console.log("POST is completed on the server" , req.body);
});

Questionrouter.patch('/:questionId', async (req,res) => {
    try {
        console.log("Request body is " + req.body);
        const updateRole = await QuestionCollection.updateOne( { _id: req.params.questionId}, 
        { $set: req.body }
        );
        res.json(updateRole);
    }
    catch (err) {
        res.json({message: err});
    }
})


module.exports = Questionrouter;