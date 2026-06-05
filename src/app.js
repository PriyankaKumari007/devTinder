const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  //creating instance of userModdel
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("User not found");
  }
});


app.get("/feed", async(req, res) => {
  try { 
    const users = await User.find({})
    res.send(users);
  } catch (err) {
    res.status(400).send("User feed not found");
  }
});

app.delete("/user",async(req,res)=>{
    const userId =  req.body._id;
    try
    {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    }
    catch(err){
        res.status(400).send("User not deleted")
    }
})

connectDB()
  .then(() => {
    console.log("Database connection establish");
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected" + err.message);
  });
