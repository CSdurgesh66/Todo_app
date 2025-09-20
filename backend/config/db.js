const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

exports.connectDB = async() => {
    try{
        console.log("enter in db");
        await mongoose.connect(DB_URL);
        console.log("Database connected successfully");

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}