const express = require("express");
const connectDB = require("./config/database");
const app =express();
const User = require("./models/user")

app.post("/signup",async(req,res)=>{

//creating instance of userModdel
    const user =  new User ({
        firstName: "Virat",
        lastName : "Kholi",
        emailId:"virat@gmail.com",
        password:"virat@12",
        age:27,
        gender:"Male"
    })
    try
    {
        await user.save();
   res.send("User added successfully")
    }
    catch(err)
    {
        res.status(400).send("Error saving the user: "+err.message)
    }
   
})


connectDB()
.then(()=>{
    console.log("Database connection establish");
    app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
});
})
.catch((err)=>{
    console.error("Database cannot be connected");
})


