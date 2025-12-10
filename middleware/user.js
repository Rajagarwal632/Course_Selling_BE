const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config")

function usermiddleware(req,res,next){
    const token = req.headers.token;
    const decodeddata = jwt.verify(token,JWT_USER_SECRET)

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
    usermiddleware:usermiddleware
}