const { Schema , model } = require("mongoose");

const bugReportSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    bugImage: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});


const BugReport =  new model("BugReport", bugReportSchema);

module.exports=BugReport;