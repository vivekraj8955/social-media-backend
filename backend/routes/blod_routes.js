const express=require('express');
const {getAllBlogs, addBlog, updateBlog, deletBlog} = require('../controllers/blog_controller');


const blogrouter=express();
blogrouter.get('/',getAllBlogs)
blogrouter.post('/add',addBlog)
blogrouter.put('/update/:id',updateBlog)
blogrouter.delete('/delet/:id',deletBlog)

module.exports=blogrouter