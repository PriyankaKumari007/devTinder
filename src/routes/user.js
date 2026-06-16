const express= require('express');
const {userAuth} = require('../middleware/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
    const loggedInUser=req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:'interested'
    }).populate("fromUserId",["firstName","lastName"]);
  
    res.json({message:'Data fetched successfully ',data: connectionRequest });
   

}catch(err){
  res.status(400).send("ERROR: "+err.message);
}
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try{
        const loggedInUser= req.user;
    const connectionRequest = await ConnectionRequest.find({
        $or:[
            {toUserId: loggedInUser._id,status:'accepted'},
              {fromUserId: loggedInUser._id,status:'accepted'}
        ]
        
    });
    res.json({message:'Connection fetch successfully',data:connectionRequest})
   }catch(err){
    res.status(400).send("ERROR: "+err.message);
   }
});

// userRouter.get("/user/feed",userRouter,async(req,res)=>{
//     try{
//         //User see all the other user card
//         //his own card
//         //card of his own connection
//         //ignored people
//         //already sent the connection request

//         const loggedInUser = req.user;
//         const page= parseInt(req.query.page)||1;
//         const limit =parseInt(req.query.limit)||10;
//         const skip = (page -1)*limit;

//         const connectionRequest = await ConnectionRequest.find({
//          $or:[
//             {fromUserId: loggedInUser._id},{toUserId:loggedInUser._id}
//          ]
//         }).select("fromUserId toUserId");

//         const hideUserFromFeed = new Set();
//         connectionRequest.forEach(req=>{
//             hideUserFromFeed.add(req.fromUserId.toString());
//             hideUserFromFeed.add(req.toUserId.toString());
//         });
//         // console.log(hideUserFromFeed);
//         const users = await User.find({
//             $and:[
//                 { _id:{ $nin: Array.from(hideUserFromFeed)}},
//                 {_id: { $ne:loggedInUser._id}}
//             ]
//         }).select("fromUserId",["firstName","lastName"]).skip(skip).limit(limit);
//         res.send(users)
//     }catch(err)
//     {
//         res.status(400).send("ERROR: ",err.message);
//     }
// })

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports=userRouter;
