var mongoose  = require("mongoose");
const bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

// Check if it is a valid email address
var validateEmail = function(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
} 

var userSchema = new Schema(
    {
    username: {
        type: String, 
        required: true, 
        maxlength: 100},
    useremail: {
        type: String, 
        required: true, 
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        },
        trim: true,
        unique: true,
        maxlength: 100},
    usercolor: {
        type: String, 
        maxlength: 100},
    userpassword:{
        type:String,
        required:true,
        minlength: 6},
    userpicture: {
        type: String}
    }
);

userSchema.statics.findAndValidate = async function (useremail, userpassword) {
    const user = await this.findOne({useremail});
    if(!user) {
        
        return false;
    }
    const isValid = await bcrypt.compare(userpassword, user.userpassword);
    return isValid ? user : false;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('userpassword')) return next();
    this.userpassword = await bcrypt.hash(this.userpassword, 10);
    next();
})

module.exports =  mongoose.model("user_model",userSchema);