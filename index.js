const express = equire("express")
const JWT_SECRET = "secret"
const jwt = require("jsonwebtoken")
const bcrypt  = require("bcrypt")
const {z} = require("zod")
const saltround = 10
const {auth} = require("./auth")

const {user} = require("./db")


const app = express()

app.post('/user/signup',async function(req,res){
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




app.post('/user/signin',async function(req,res){
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

app.get("/courses", async function(req,res){

})
app.get("/user/purchases", async function(req,res){

})
app.post("/course/purchase", async function(req,res){

})
app.get("/", async function(req,res){

})



app.listen(3000)