const {Router} = require("express")
const {adminmodel} = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {z} = require("zod")
const saltround = 10
const JWT_ADMIN_SECRET = "123456789"

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
            email:email,
            name:existuser.name
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

// adminRouter.use(adminMiddleware)

adminRouter.post("/course", async function(req,res){

})
adminRouter.put("/course", async function(req,res){

})
adminRouter.get("/course", async function(req,res){

})



module.exports = {
    adminRouter : adminRouter
}
