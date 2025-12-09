const {Router} = require("express")
const { usermodel } = require("../db")
const bcrypt  = require("bcrypt")
const {z} = require("zod")
const saltround = 10
// const {auth} = require("./auth")

const jwt = require("jsonwebtoken")
const JWT_USER_SECRET = "secret"

const userRouter = Router()


userRouter.post('/signup',async function(req,res){
    const reqbody = z.object({
        email : z.string().email(),
        password : z.string().min(8),
        firstname : z.string().min(3),
        lastname : z.string().min(3)
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "Incorrect Format",
            error : parsedatawithsucess.error.errors
        })
        return;
    }
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const hashpassword =await bcrypt.hash(password,saltround);

    await usermodel.create({
        email:email,
        password:hashpassword,
        firstname:firstname,
        lastname:lastname
    })
    res.json({
        msg : "You are signed up as user"
    })
})

userRouter.post('/signin',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const existuser = await usermodel.findOne({
        email:email
    })

    if(!existuser){
        res.status(403).json({
            msg : "User not found"
        })
        return;
    }
    const passwordmatch = await bcrypt.compare(password,existuser.password)

    if(passwordmatch){
        const token = jwt.sign({
            id : existuser._id.toString()
        },JWT_USER_SECRET)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            msg : "Incorrect password"
        })
    }
})

userRouter.get("/purchases", async function(req,res){

})



module.exports = {
    userRouter : userRouter
}
