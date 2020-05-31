const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    qtype:String,
    category: String,
    title:String,
    rateMin:Number,
    rateMax: Number,
    rateDescription: [String],
    parentTag: String,
    taggedTo:[String]
});


module.exports = mongoose.model('QuestionCollection', QuestionSchema);