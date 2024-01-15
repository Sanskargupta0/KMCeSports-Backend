const { Schema , model } = require("mongoose");

const emailSchema = new Schema ({
    email: {
        type: String,
        required: [true, "Email is required"]
    }
});

const Email = new model("Subscribe_Email",emailSchema);
module.exports=Email;
