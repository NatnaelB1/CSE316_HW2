var mongoose  = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
    username: {type: String, required: true, maxlength: 100},
    useremail: {type: String, required: true, maxlength: 100},
    usercolor: {type: String, required: true, maxlength: 100},
    }
);

module.exports =  mongoose.model("user_model",userSchema);