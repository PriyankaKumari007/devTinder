const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookie = require('cookie-parser');


app.use(express.json());
app.use(cookie())

const authRouter = require("./routes/auth");
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
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
