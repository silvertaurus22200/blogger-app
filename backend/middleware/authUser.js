import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

//authentication
const isAuthenticated = async (req, res, next) => {

    try {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(404).json({error : "no token found"})

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await  User.findById(decoded.user_id);
    req.user = user;
    if(!user){
        return res.status(401).json({message : "user does not exist"})
    }
    next();    
    } catch (error) {
        res.status(401).json({error : "user not authenticated"})
    }
} 

//authorization
const isAdmin = (...roles)=>{
    return (req,res,next)=> {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({error : `user with the given role "${req.user.role}" is not allowed`});
        }
        next();
    }
}


export default {isAuthenticated, isAdmin};