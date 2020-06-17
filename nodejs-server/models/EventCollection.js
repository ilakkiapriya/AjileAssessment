const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    eventName:String,
    status: String,
    surveyType: [String],
    targetedRoles:[String]
});


module.exports = mongoose.model('EventCollection', EventSchema);