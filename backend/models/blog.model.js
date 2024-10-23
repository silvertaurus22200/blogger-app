import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },

    blogImage : {
        public_id :{
            type : String,
            required: true
        },
        url : {
            type : String,
            required : true
        }
    },

    category : {
        type : String,
        required : true
    },
    
    about : {
        type : String,
        required : true,
        minlength: [200, "should contain atleast 200 characters"]
    },

    adminName : {
        type : String,
        required : true
    },
    
    adminPhoto : {   
        type : String,
    },

    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;