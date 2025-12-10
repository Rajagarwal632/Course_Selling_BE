const {Router} = require("express")
const {adminmodel} = require("../db")
const {coursemodel} = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {z} = require("zod")
const saltround = 10
const { JWT_ADMIN_SECRET } = require("../config")


const adminRouter = Router()

adminRouter.post('/signup',async function(req,res){
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

    await adminmodel.create({
        email:email,
        password:hashpassword,
        firstname:firstname,
        lastname:lastname
    })
    res.json({
        msg : "Admin created successfully"
    })




})

adminRouter.post('/signin',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const existuser = await adminmodel.findOne({
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
            id:existuser._id
        },JWT_ADMIN_SECRET)
        res.json({
            token:token
        })
    }else{
        res.json({
            msg : "Incorrect password"
        })
    }
})

adminRouter.use(adminMiddleware)

adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminid = req.userid
    const reqbody = z.object({
        title : z.string(),
        description : z.string().min(8),
        imageurl: z.string().min(3),
        price : z.number()
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "Incorrect Format",
            error : parsedatawithsucess.error.errors
        })
        return;
    }
    const title = req.body.title
    const description = req.body.description
    const imageurl = req.body.imageurl
    const price = req.body.price

    const course = await coursemodel.create({
        title,
        description,
        price,
        imageurl,
        creatorId : adminid


    })
    res.json({
        msg : "Course created successfully",
        courseid : course._id
    })

})
adminRouter.put("/course", async function(req,res){

})
adminRouter.get("/course/bulk", async function(req,res){

})



module.exports = {
    adminRouter : adminRouter
}
