 const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

 const userAuth = async(req,res,next)=>{
     // console.log("userAuth started");
    //Read the token
    try{
   const {token} = req.cookies;
   if(!token)
   {
    throw new Error("Token is not valid!!!!");
   }
   const decodedObj = await jsonwebtoken.verify(token,"DEV@Tinder4790");

   const{_id} = decodedObj;
   const user = await User.findById(_id);

   if(!user)
   {
    throw new Error("User not found")
   }
   req.user = user;
//    console.log("AuthUser",req.user);
//    console.log("before next()");
        next();
        //console.log("after next()");
}catch(err)
{
    res.status(400).send("ERROR " +err.message)
}
}



module.exports={
    userAuth
}