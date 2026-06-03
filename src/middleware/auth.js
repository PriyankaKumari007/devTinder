 const adminAuth = (err,req,res,next)=>{
    const token ="xyz";
    const isAuthenticated = token == 'xyz';
   
    if(!isAuthenticated)
    {
        res.status(401).send("UnAuthorized access");
    }
    else
    {
        next();
    }
}



module.exports={
    adminAuth
}