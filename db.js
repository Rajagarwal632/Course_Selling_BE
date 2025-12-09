const mongoose = require("mongoose")
const { id } = require("zod/v4/locales")
console.log("connected ")

mongoose.connect("mongodb://localhost:27017/app")

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
    imageUrl : String,
    creatorId : objectId
})

const purchase = new Schema({
    userId : objectId,
    courseId : objectId

})
const usermodel = mongoose.model("user",user)
const adminmodel = mongoose.model("admin",admin)
const coursemodel = mongoose.model("course",course)
const purchaseemodel = mongoose.model("purchase",purchase)

module.exports = {
    usermodel : usermodel,
    adminmodel : adminmodel,
    coursemodel : coursemodel,
    purchaseemodel : purchaseemodel
}