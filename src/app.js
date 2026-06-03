const express = require("express");

const app =express();

const {adminAuth} = require("./middleware/auth")

app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    res.send({username:"Virat",jerseyNo:18})
})


app.get("/getStaffData",(req,res)=>{
    try{
       res.send("User Data Sent")
    } catch(err)
    {
        res.status(500).send("Something went wrong")
    }
})

app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Contact Support Team")
    }
})
// // ? query 
// app.get("/ab?c", (req,res,next)=>{    
//    // Route Handler
//     res.send("Hellooooooooooo1");
//     next();
  
// },
// (req,res)=>{
// res.send("2nd Response")
// });

// // :/ Dynamic routing
// app.get("/user/:username/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send("Dynamic routing")
// })
app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
});