const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI

const connectDB = async ()=>{
    try {
await mongoose.connect(URI)
console.log("our db is connected")
        
    } catch (error) {
        console.error("error found",error)
        console.log("db is not connected")
    }
}
module.exports = connectDB;