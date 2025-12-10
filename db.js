const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const Schema = mongoose.Schema
const objectId = Schema.ObjectId

const user = new Schema({
    email : {type:String,unique : true},
    password : String,
    firstname : String,
    lastname : String
})


const admin = new Schema({
    email : {type:String,unique : true},
    password : String,
    firstname : String,
    lastname : String
})

const course = new Schema({
    title : String,
    description : String,
    price : Number,
    imageurl : String,
    creatorId : objectId
})

const purchase = new Schema({
    userId : objectId,
    courseId : objectId

})
const usermodel = mongoose.model("user",user)
const adminmodel = mongoose.model("admin",admin)
const coursemodel = mongoose.model("course",course)
const purchasemodel = mongoose.model("purchase",purchase)

module.exports = {
    usermodel : usermodel,
    adminmodel : adminmodel,
    coursemodel : coursemodel,
    purchasemodel : purchasemodel
}