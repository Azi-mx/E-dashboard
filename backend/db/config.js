const mongoose = require('mongoose')
require('dotenv').config();
console.log("MongoDB Connection String:", process.env.DATABASE_URL);
    mongoose.connect(`${process.env.DATABASE_URL}`,{useNewUrlParser:true})
    
