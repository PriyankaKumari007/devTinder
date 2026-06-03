const express = require("express");

const app =express();

//This will only handle  GET call to user
app.get("/user",(req,res)=>{
    res.send({firstname:"Priyanka", lastname:"Mahato"})
})

app.post("/user",(req,res)=>{
    res.send("Data successfully send to server")
})
app.use("/test",(req,res)=>{
    res.send("Hello from server")
});

//this will match all the Http method API calls to test
app.use("hello",(req,res)=>{
    res.send("hello hello helllooooooooo")
})

app.use("/",(req,res)=>{
    res.send("Hello from dashboard")
})

app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
});