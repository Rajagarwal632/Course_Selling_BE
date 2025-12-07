const {Router} = require("express")

const userRouter = Router()


userRouter.post('/signup',async function(req,res){
    const reqbody = z.object({
        email : z.email(),
        password : z.string().min(8),
        name : z.string().min(3)
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess){
        res.json({
            msg : "Incorrect Format",
            error : parsedatawithsucess.error
        })
        return;
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    const hashpassword =await bcrypt.hash(password,saltround);

    const newuser =await user.create({
        email:email,
        password:hashpassword,
        name:name
    })




})

userRouter.post('/signin',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const existuser = await user.findOne({
        email:email
    })

    if(!existuser){
        res.json({
            msg : "User not found"
        })
        return;
    }
    const passwordmatch = await bcrypt.compare(password,existuser.password)

    if(passwordmatch){
        const token = jwt.sign({
            email:email,
            name:existuser.name
        },JWT_SECRET)
        res.json({
            token:token
        })
    }else{
        res.json({
            msg : "Incorrect password"
        })
    }
})

userRouter.get("/purchases", async function(req,res){

})



module.exports = {
    userRouter : userRouter
}
