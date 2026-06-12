const express = require('express');
const profileRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/user");

profileRouter.get("/profile",async(req,res)=>{
  try
  {
     const cookie =  req.cookies;

   const {token} = cookie;

   //Validate the cookie
   const decodedMessage = await jsonwebtoken.verify(token,"DEV@Tinder4790");
   const{_id} = decodedMessage;
   console.log("Logged in user is: "+ _id);
   const user = User.findById(_id);
   if(!user)
   {
    throw new Error("User does nt exist");
   }
   res.send(user)
  }catch(err)
  {
    throw new Error("Invalid token")
  }
});

module.exports = profileRouter;