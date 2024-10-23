import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const generateTokenAndcookies = async (user_id, res) => {
    
    const token = jwt.sign({user_id}, process.env.JWT_SECRET_KEY,{
        expiresIn : "7d",
    });
    
    res.cookie("jwt", token, {
        httpsOnly : false,
        secure : true,
        sameSite : "none"
    });   

    await User.findByIdAndUpdate(user_id , {token})
    return token;

}

export default generateTokenAndcookies;