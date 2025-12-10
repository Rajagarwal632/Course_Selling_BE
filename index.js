const express = require("express")
// const JWT_SECRET = "secret"
// const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
// const bcrypt  = require("bcrypt")
// const {z} = require("zod")
// const saltround = 10
const {usermodel} = require("./db")
const {coursemodel} = require("./db")
const {adminmodel} = require("./db")
const {usermiddleware} = require("./middleware/user")




const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const { adminRouter } = require("./router/admin")


const app = express()
app.use(express.json())
app.use("/user" , userRouter)
app.use("/course" , courseRouter)
app.use("/admin" , adminRouter)

async function main(){
    await mongoose.connect("mongodb://localhost:27017/app")
    app.listen(3000)
    console.log("listening on port 3000")

}
main()