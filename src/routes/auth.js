const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jsonwebtoken = require('jsonwebtoken');
authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const {firstName, lastName,emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating instance of userModdel
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login",async(req,res)=>{
try{
const{emailId,password} =req.body;
const user = await User.findOne({emailId:emailId})

if(!user)

    {
        throw new Error("Invalid Credentials")
    }

    
const isPasswordValid = await bcrypt.compare(password,user.password)
if(isPasswordValid)
{

    //Create aJWT token
    const token = await jsonwebtoken.sign({_id: user._id},"DEV@Tinder4790");
    console.log(token)
   res.cookie("token",token)

    //Add the token to cookie and send the response back to the user
    res.send("Login Successfull")
}
else
{
    throw new Error("Password is not correct")
}
}catch(err){
 throw new Error("ERROR " + err.message);
}
});

module.exports = authRouter