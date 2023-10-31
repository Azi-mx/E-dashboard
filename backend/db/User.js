const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    googleId:String
})
module.exports = mongoose.model('users',userSchema)
    