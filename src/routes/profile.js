const express = require("express");
const profileRouter = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth.js");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // const cookie = req.cookies;
    // const { token } = cookie;

    // //Validate the cookie
    // const decodedMessage = await jsonwebtoken.verify(token, "DEV@Tinder4790");
    // const { _id } = decodedMessage;
    // console.log("Logged in user is: " + _id);
    // const user = await User.findById(_id);
    // if (!user) {
    //   throw new Error("User does nt exist");
    // }
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("Invalid token");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("/profile/edit",req)
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
   await loggedInUser.save();
    console.log("Before Update", loggedInUser);
    // res.send(loggedInUser.firstName + " :Profile updated successfully");
    res.json({message: loggedInUser.firstName + " :Profile updated successfully",
      data:loggedInUser
    })
    console.log("After Update", loggedInUser);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});
module.exports = profileRouter;
