const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectId = Schema.ObjectId

const user = new Schema({
    email : {type:String,unique : true},
    password : String,
    name : String
})

const usermodel = mongoose.model("user",user)

module.exports = {
    usermodel : usermodel
}