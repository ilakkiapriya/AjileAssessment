const mongoose = require('mongoose');

/*[
    {
        roleName :  Developer
        questions : [
            {
                type: checkbox
                title: "What is your name",
                isRequired: true,
                choices: ["Windows", "Linux", "Macintosh OSX"]
            },
            {
                type: "rating",
                title: "How satisfied are you with the Project?",
                rateMin: 1,
                rateMax: 5,
                rateDescription: [ "Awesome", "Very good" , "Good" , "Fair" , "Poor"]
            }
        ]
    },
    {
        roleName : Manager
        questions : []
    }
 ]
*/
const QuestionSchema = mongoose.Schema({
    roleName:{
        type: String,
        required: true
    },
    questions: [{
            qtype:String,
            category: String,
            title:String,
            rateMin:Number,
            rateMax: Number,
            rateDescription: [String]
        }]
});


module.exports = mongoose.model('QuestionCollection', QuestionSchema);