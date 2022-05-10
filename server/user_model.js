var mongoose  = require("mongoose");
const bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
    username: {
        type: String, 
        required: true, 
        maxlength: 100},
    useremail: {
        type: String, 
        required: true, 
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