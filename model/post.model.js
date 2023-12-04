const mongoose = require("mongoose")


const postSchema =new mongoose.Schema({
  name : {type:String,required:true},
  description :  {type:String,required:true},
  category :  {type:String,required:true},
  image :  {type:String,required:true},
  location :  {type:String,required:true},
  postedAt :  {type:Date,required:true},
  price :  {type:Number,required:true}
})

const postModel = mongoose.model("post",postSchema)


module.exports={
    postModel
}