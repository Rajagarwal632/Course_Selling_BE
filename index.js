const express = equire("express")
const JWT_SECRET = "secret"
const jwt = require("jsonwebtoken")
const bcrypt  = require("bcrypt")
const {z} = require("zod")
const saltround = 10
const {auth} = require("./auth")

const {user} = require("./db")
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")


const app = express()


app.use("/user" , userRouter)
app.use("/course" , courseRouter)



app.get("/", async function(req,res){

})



app.listen(3000)