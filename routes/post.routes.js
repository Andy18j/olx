const express = require("express")

const {postModel} = require("../model/post.model")

const postRouter = express.Router()

postRouter.post("/post",async(req,res)=>{
    try{
        const {name,description,category,image,location,postedAt,price}= req.body
        const user = await postModel ({name,description,category,image,location,postedAt,price})
        await user.save()
        res.status(200).json({msg:"Data Posted Sucessfullyy..",user})

    }
    catch(err){
        res.status(402).json({msg:"Something went wrongg.."})
    }
})

// for delete the itmes ?  /   

postRouter.delete("/delete/:id",async(req,res)=>{
    try{
    const product = await postModel.findByIdAndDelete(req.params.id)
    res.status(201).json({msg:"the product are deleted sucessfully"})
    }
    catch(err){
        res.status(402).json({msg:"Something went wrongg.."})
    }
})


//filter by category  
postRouter.get("/filter/:category",async(req,res)=>{
    const {category} = req.params;
    try{
        const  filter = await postModel.find({category:category})
        if (filter.length===0){
          return res.status(404).json({msg:"This type of category are not there.."})
        }else{
            res.status(200).json({msg:"filter the data by category",filter})
        }
    }
    catch(err){
        res.status(402).json({msg:"Something went wrongg with filtering"})
    }
})

//sorting by date

postRouter.get("/sort/date", async (req, res) => {
    try {
      const sort = await postModel.find().sort({ Date: "desc" });
      res.status(200).json({ msg: "Sort the data by date", sort });
    } catch (err) {
      res.status(500).json({ msg: "Something went wrong with sorting the date", error: err.message });
    }
  });


//   for searching the produuctt 

postRouter.get("/search/:name",async(req,res)=>{
  const {name} = req.params
  try{
     const search = await postModel.find({name : {$regex : new RegExp(name,"i")}
    
    })
    res.status(201).json({msg:"your Product are here!!",search})
  }
 
  catch(err){
    res.status(404).json({msg:"something went wrong",err})
  }
})

// for pagination  
 postRouter.get("/page/:page",async(req,res)=>{
    const {page} = req.params
    const perpage = 4 //like my number of items per page here 
    try{
        const page = await postModel.find().skip((page-1)*perpage).limit(perpage)
        res.json("paginaation are heree",page)
    
    }
    catch(err){
        res.status(404).json({msg:"something went wrong",err})
    }
 })

module.exports = {
    postRouter
}