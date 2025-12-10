const { JWT_ADMIN_SECRET } = require("../config")

const jwt = require("jsonwebtoken")


function adminmiddleware(req,res,next){
    const token = req.headers.token;
    const decodeddata = jwt.verify(token,JWT_ADMIN_SECRET)

    if(decodeddata){
        req.userId = decodeddata.userId
        next()
    }else{
        res.json({
            msg : "Not Authorized"
        })
    }
}

module.exports = { 
    adminmiddleware:adminmiddleware
}