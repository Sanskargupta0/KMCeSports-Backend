const { Schema , model } = require("mongoose");

const contactSchema = new Schema({
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
    }
});

const Contact = new model("Conatct",contactSchema);
module.exports=Contact;