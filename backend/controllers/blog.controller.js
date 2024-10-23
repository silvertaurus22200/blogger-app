import {v2 as cloudinary } from "cloudinary"
import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

const createBlog = async (req, res) => {
    try {
    
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({error : "blogImage not found"})
    }

    const {blogImage} = req.files
    const allowedFormats = ["image/jpeg","image/png", "image/webp"];
    if(!allowedFormats.includes(blogImage.mimetype)){
        return res.status(400).json({error : "only jpg and png formats allowed"})
    }

    const {title, about , category} = req.body;

    if(!title || !about || !category) {
        return res.status(400).json({error : "title, about and category fields are required"})
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy  = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse)
    }

    const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,
            blogImage : {
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.url
            }

            
        }
        const blog = await Blog.create(blogData);

        res.status(201).json({messsage : "blog created successfully" ,
            blog,
        })

    } catch (error) {
        res.status(500).json({error: error})

    }
}


const deleteBlog = async (req, res) => {
    const blogId = req.params.id
    console.log(blogId)
    try {
        const blog = await Blog.findOne({_id : blogId});
        console.log(blog)
        if(!blog){
            return res.status(404).json({message : "blog not found"})
        }

        await blog.deleteOne();
        res.status(200).json({message : "blog deleted successfully"})


    } catch (error) {
        res.status(500).json({error})
    }
}

const getAllBlogs = async (req, res) => {
    try {
       const blogs = await Blog.find(); 
       res.status(200).json({length: blogs.length , blogs})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        console.log(blogId);
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).json({error : "invalid blog id"})
        }
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error : "blog not found"})
        }

        res.status(200).json(blog)

    } catch (error) {
        res.status(500).json({error});
    }
}

const getMyBlogs = async (req, res) => {
    
    const userId = req.user._id;
    console.log(userId);
    try {
        const myBlogs = await Blog.find({createdBy : userId});
        if(!myBlogs) {
            return res.status(404).json({error: "blogs not found"})
        }

        res.status(200).json({length : myBlogs.length , blogs : myBlogs})
    } catch (error) {
        
    }
}

const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
        console.log("error")
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).json({error : "invalid blog id"})
        }
        console.log("error2")
        const {title, category, about} = req.body;
        let updatedData = {title, category, about};

        if(req.files)
            { console.log("error3")
            const {blogImage} = req.files;
            const allowedFormats = ["image/jpeg","image/png", "image/webp"];
            if(!allowedFormats.includes(blogImage.mimetype)){
                return res.status(400).json({error : "only jpg and png formats allowed"})
            }
            
            const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath)
            if(!cloudinaryResponse || cloudinaryResponse.error){
                console.log(cloudinaryResponse)
            }
           
            updatedData.blogImage = {
                public_id : cloudinaryResponse.public_id ,
                url : cloudinaryResponse.url
            }
        } 

        console.log("error4")

        const blog = await Blog.findByIdAndUpdate(blogId, updatedData , {new : true})
        res.status(201).json(blog);
    } catch (error) {
         res.status(500).json({error})
    }
}

export default {createBlog, deleteBlog, getAllBlogs, getSingleBlog, getMyBlogs, updateBlog};