const express = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.post("/signup",async(req,res)=>{
    try{
        const {Email,Password,Confirm_Password} = req.body;
        const hased = await bcrypt.hash(Password,8)
        const newuser = new userModel({
            Email,Password:hased,Confirm_Password:hased
        })
        await newuser.save()
        res.status(200).json({msg:"User Registerd Sucessfully..",newuser})

    }
    catch(err){
        res.status(404).json({msg:"Invalid Credentials"})
    }
})


userRouter.post("/login",async(req,res)=>{
    try{
        const {Email,Password} = req.body
        const newuser = await userModel.findOne({Email})

        if (!newuser){
            return res.status(502).json({msg:"This Type of User Are Not Found"})
        }
        const ispassvalid = await bcrypt.compare(Password,newuser.Password)
        if (!ispassvalid){
            return res.status(501).json({msg:"Incorrect Password.."})
        }
        const token = jwt.sign({userId:newuser._id},process.env.secret)
        res.status(201).json({msg:"Login sucessfully...",newuser,token:token})

    }
    catch(err){
        res.status(404).json({msg:"Invalid Credentials"})
    }
})

module.exports = {
    userRouter
}