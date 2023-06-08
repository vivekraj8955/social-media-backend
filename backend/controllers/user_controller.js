const User = require('../models/User')
const bcrypt=require('bcryptjs')
const signup=async(req,res)=>{
     const {name,email,password}=req.body;
     let existingUser;
     try{
        existingUser=await User.findOne({email})
     }
     catch(err){
           console.log(err)
     }
     if(existingUser) 
     {
       return res.status(400).json({message:"user alredy exists"})
     } 
     const hashedPassword=bcrypt.hashSync(password);
     const user =new User({name,email,password:hashedPassword,blogs:[]})
     try{
          await user.save();
     }
     catch(err){
          console.log(err)
     }
     return res.status(201).json({user})
}

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }
    catch(err)
    {
        console.log(err)
    }
    if(!existingUser)
    {
      return res.status(404).json({message:"invalid email"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect)
    {
      return res.status(404).json({message:"invalid password"})
    }
    return res.status(200).json({message:"login successfull"})
}

module.exports={signup,login};
