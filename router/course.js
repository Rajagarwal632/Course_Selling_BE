const {Router} = require("express")

const courseRouter = Router()

courseRouter.get("/", async function(req,res){

})

courseRouter.post("/purchase", async function(req,res){

})


module.exports = {
    courseRouter : courseRouter
}