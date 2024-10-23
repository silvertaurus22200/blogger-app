import User from "../models/user.model.js"
import {v2 as cloudinary}  from "cloudinary";
import bcrypt from "bcryptjs"
import generateTokenAndcookies from "../jwt/AuthToken.js";


const register = async (req, res)=>{
    const {name , email, phone, education,password,role} = req.body;

    
    if(!req.files || Object.keys(req.files.photo).length === 0){
        return res.status(400).json({error : "no image was found"})
    }
    const photo = req.files.photo;
    if(!name || !email || !phone || !education || !password || !role || !photo){
        return res.status(400).json({error: "data missing"})
    }

    const user = await User.findOne({email});

    if(user){
        return res.status(400).json({error: "user already exist"})
    }


    const hashPassword = await bcrypt.hash(password, 10);

    const allowedFormats =["image/jpeg", "image/png" ,"image/webp"];
    if(!allowedFormats.includes(photo.mimetype)) {
        console.log(req.files)
            return res.status(400).json({message : "Invalid photo format. Only jpg and png are allowed"})
    }

    try {
    //upload to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    )

    const newUser = new User({
        name,
        email,
        phone,
        education,
        role,
        photo : {
            public_id : cloudinaryResponse.public_id,
            url : cloudinaryResponse.url
        },
        password : hashPassword
    })  

    console.log(newUser)
    
    await newUser.save();
    
    res.status(200).json({message : "user created successfully"})
} catch (error) {
    res.status(500).json({error : error})
    }


}

const login = async (req, res) => {
    const {email, role , password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "user doesn't exist"})
        }
        
        const isMatched = await bcrypt.compare(password , user.password);
        if(!isMatched || user.role !== role){
            return res.status(400).json({error : "Invalid credentials"})
        }        
        const token = await generateTokenAndcookies(user._id, res);

        res.status(200).json({message : "user logged in successfully" ,
            user : {
                _id : user._id,
                email  : user.email,
                role : user.role,
                name : user.name
            },
            token : token,
        })




    } catch (error) {
        res.status(500).json({error})
    }

}

const logout = (req, res) => {

    try {
        res.clearCookie("jwt");
        console.log("cookies",req.cookies);
        res.status(200).json({message: "logged out successfully"});
    } catch (error) {
        res.status(500).json({error})
    }

    }

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({error : "user not found"})
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error})
    }
}  

const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({role : "admin"});
        if(!admins) {
            return res.status(404).json({error : "admins not found"})
        }

        res.status(200).json({length : admins.length, admins});
    } catch (error) {
        res.status(500).json({error})
    }
}

export default {register, login, logout, getUserProfile, getAllAdmins}