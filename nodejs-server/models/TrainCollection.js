const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    teamName:{
        type: String,
        required: true
    },
    teamDesc: {
        type: String,
        required: true
    },
    teamOwner: {
        type: String,
        required: true
    }
});

const TrainSchema = mongoose.Schema({
    trainName:{
        type: String,
        required: true
    },
    trainDesc: {
        type: String,
        required: true
    },
    trainOwner: {
        type: String,
        required: true
    },
    teams: [{
                teamName:String,
                teamDesc:String,
                teamOwner:String
        }]
    
});


module.exports = mongoose.model('TrainCollection', TrainSchema);