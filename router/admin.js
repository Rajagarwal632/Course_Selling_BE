const {Router} = require("express")

const adminRouter = Router()

adminRouter.post('/signup',async function(req,res){
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

    const newuser =await usermodel.create({
        email:email,
        password:hashpassword,
        name:name
    })




})

adminRouter.post('/signin',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const existuser = await usermodel.findOne({
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
