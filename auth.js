function auth(req,res,next){
    const token = req.headers.token;
    const decodeddata = jwt.verify(token,JWT_SECRET)

    if(decodeddata){
        req.userId = decodeddata.userId
        next()
    }else{
        res.json({
            msg : "Not Authorized"
        })
    }
}
