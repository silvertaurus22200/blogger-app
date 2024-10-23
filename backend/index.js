import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./Routes/user.route.js"
import fileUpload from "express-fileupload"
import {v2 as cloudinary} from "cloudinary"
import cookieParser from "cookie-parser"
import blogRoute from "./Routes/blog.route.js"
import cors from "cors"

const app = express();

dotenv.config();

const port = process.env.PORT;
const mongoDB_url = process.env.MONGODB_URI

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods : ["GET","POST","DELETE","PUT"]
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp"
}))


//cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});


try {
    mongoose.connect(mongoDB_url);
    console.log("connected to mongoDB")    
} catch (error) {
    console.log(error)
}

//Routes
app.use("/api/user",userRoute)
app.use("/api/blog",blogRoute)

app.listen(port, ()=>{console.log(`server is running on ${port}`)})