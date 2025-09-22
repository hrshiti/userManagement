require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const router = require("./routes/authRoutes")

// const router = require("./router/auth-router")
const connectDB = require("./config/db")




const corsOptions ={
    origin:["http://localhost:5173","https://soft-alpaca-e4373d.netlify.app"],
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}


app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true })); 
app.use("/", router)





const PORT = process.env.PORT || 5000;
connectDB().then(()=>{

    app.listen(PORT,()=>{
        console.log("our server is running hurry")
        
    })
})