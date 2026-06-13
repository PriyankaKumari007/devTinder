const mongoose = require("mongoose");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");
const userSchema = new  mongoose.Schema({
   firstName: {
    type: String,
    required:true,
    minLength:4
   },
   lastName:{
    type:String
   },
   emailId:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value)
    {
       if(!validator.isEmail(value))
       {
        throw new Error("Email is invalid");
       }
    }
   },
   password:{
    type:String,
    required:true,
    validate(value){
        if(!validator.isStrongPassword(value))
        {
            throw new Error("Password is not strong, set a strong password")
        }
    }
   },
   age:{
    type:Number
   },
   gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value))
        {
            throw new Error("Gender is not valid");
        }
    }
   },
   photoUrl:{
    type:String
   },
   about:{
    type:String,
    default:"This is default about of user"
   },
   skills:{
    type:[String]
   },

},
   {
    timestamps:true
   });

userSchema.methods.getJWT = async function() {
    const user =this;
      const token = await jsonwebtoken.sign(
            { _id: user._id },
            "DEV@Tinder4790", {expiresIn:"1d"}
          );
          return token
}   
module.exports = mongoose.model("User",userSchema);
