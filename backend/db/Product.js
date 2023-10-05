const mongoose = require('mongoose')

// Here we have made the schema or structure of product's document
const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})
module.exports = mongoose.model('products',productSchema)
    