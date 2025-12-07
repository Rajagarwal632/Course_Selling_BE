const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectId = Schema.ObjectId

const user = new Schema({
    email : {type:String,unique : true},
    password : String,
    name : String
})


module.exports = mongoose.model("user",user)