const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blog",
        required:true
    }]
})
module.exports=new mongoose.model('user',userSchema)