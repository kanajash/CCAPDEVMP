const mongoose = require("mongoose");

const mongoUrl = 'mongodb+srv://user1:appdev@cluster0.rqq5k.mongodb.net/APPDEV';


mongoose.connect(mongoUrl, {useUnifiedTopology: true,useNewUrlParser:true })

var connection = mongoose.connection;


connection.on('error',()=>{
    console.log("MongoDB Connection Failed");
})

connection.on('connected',()=>{
    console.log("MongoDB Connection Successful");
})

module.exports = mongoose;
