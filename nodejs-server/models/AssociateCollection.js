const mongoose = require('mongoose');

const AssociateSchema = mongoose.Schema({
    empName:{
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true
    },
    empEmailId: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    trainName: {
        type: String,
        required: false
    },
    teamName: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model('AssociateCollection', AssociateSchema);