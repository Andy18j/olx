const express = require("express")
require('dotenv').config()
const {connection} = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { postRouter } = require("./routes/post.routes")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api",postRouter)
app.get("/",(req,res)=>{
    res.send("OLX")
})



app.listen(process.env.port,async()=>{
    try{
         await connection
         console.log("CONNECTED")
    }
    catch(err){
        console.log(err)
        console.log("NOT CONNECTED TO THE DB")
    }
    console.log(`port is running at the ${process.env.port}`)
})