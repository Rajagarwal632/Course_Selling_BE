const express = require("express")
// const JWT_SECRET = "secret"
// const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
// const bcrypt  = require("bcrypt")
// const {z} = require("zod")
// const saltround = 10
// const {auth} = require("./auth")
// const {usermodel} = require("./db")


mongoose.connect("mongodb://localhost:27017/app")


const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const { adminRouter } = require("./router/admin")


const app = express()


app.use("/user" , userRouter)
app.use("/course" , courseRouter)
app.use("/admin" , adminRouter)



app.get("/", async function(req,res){

})



app.listen(3000)