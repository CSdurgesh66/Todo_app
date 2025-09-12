const mongoose = require("mongoose");

const DB_URl = process.env.DB_URl;

exports.connectDB = async() => {
    try{
        await mongoose.connect(DB_URl);
        console.log("Database connected successfully");

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}