const { default: mongoose } = require('mongoose');
const Blog=require('../models/Blog');
const User = require('../models/User');

const getAllBlogs=async(req,res,next)=>{
     let blog;
     try{
       blog= await Blog.find();
     }
     catch(err)
     {
         console.log(err)
     }
     if(!blog)
     {
        return res.status(404).json({message:"blog not found"})
     }
     return res.status(200).json(blog)
}

const addBlog =async(req,res)=>{
    const {title,description,image,user}=req.body;
    let existingUser;
    try{
       existingUser=await User.findById(user)
    }
    catch(err){
       console.log(err)
    }
    if(!existingUser)
    {
      return res.status(400).json({message:"unable to find user by this id"})
    }
   const blog =new Blog({title,description,image,user})
   try{
       const session=await mongoose.startSession();
       session.startTransaction();
       await blog.save({session})
       existingUser.blogs.push(blog)
       await existingUser.save({session})
       await session.commitTransaction();
   }
   catch(err){
         console.log(err) 
         return res.status(500).json({message:err})
   }
   return res.status(200).json({blog})

}

const updateBlog=async(req,res)=>{
      const {title,description}=req.body;
      const id=req.params.id
      let blog
      try{
        blog=await Blog.findByIdAndUpdate(id,{
        title,description
      })
    }
    catch(err)
    {
        console.log(err)
    }
    if(!blog)
    return res.status(500).json({message:"unable to update"})
    return res.status(200).json(blog)
}

const deletBlog =async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate('user');
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    } catch (err) {
      console.log(err);
    }
    if (!blog) {
      return res.status(404).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
}

module.exports={getAllBlogs,addBlog,updateBlog,deletBlog}