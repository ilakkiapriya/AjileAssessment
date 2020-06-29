const mongoose = require('mongoose');

const eventResultSchema = mongoose.Schema({
    eventName:String,
    empId: String,
    qaArr: [{
        question:String,
        answer:String
    }]
});

eventResultSchema.index({ eventName: 1, empId: 1 });

module.exports = mongoose.model('EventResultsCollection', eventResultSchema);