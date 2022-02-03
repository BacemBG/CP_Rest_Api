const mongoose = require('mongoose');
require("dotenv").config({path:"/config/.env"})
//DB_URI = "mongodb://localhost:27017/ContactF3"

const connectDB = async()=>{
    try{
        let result = await mongoose.connect(process.env.DB_URI);
        console.log('database coneected');
    } catch (err) {
        console.log(`can not connect to database ${err}`)
    }
}

module.exports = connectDB