import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utility";

function CreateBlog() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("")
  const [blogImage, setBlogImage] = useState("");
  const [photoPreview,setPhotoPreview] = useState("");
  const [pending, setPending] = useState(false);

  
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(e);
    reader.readAsDataURL(file);
    reader.onload = ()=> {
        setPhotoPreview(reader.result);
        console.log(reader)
        setBlogImage(file);
    }
}

const handleCreateBlog  = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category",category);
  formData.append("about", about);
  formData.append("blogImage",blogImage);
  try {
      setPending(true);
      const {data} = await axios.post(`${BACKEND_URL}/api/blog/create`,formData,
          {
              headers : {
                  "Content-Type" : "multipart/form-data",
              },
              withCredentials : true
          }
      )
      console.log(data);
      toast.success(data.message || "registered succesfully")
      setPending(false)
      setTitle("")
      setAbout("");
      setCategory("");
      setBlogImage("")
      setPhotoPreview("");
  } catch (error) {
      setPending(false)
      console.log(error)
      toast.error(error.response.data.error || "please fill the required fields")
  }
}

  return (
    <>
    <div className="h-screen flex justify-center items-center bg-gray-100">

    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleCreateBlog}>
            <h1 className="font-semmibold text-xl mb-6">Create Blog</h1>
            <label>Title</label>
            <div className="mb-4">
                <input type="text" 
                placeholder="Title"
                value = {title}
                onChange={(e)=>{setTitle(e.target.value)}}
                className="w-full p-2 border rounded-md"
                required />
            </div>
            <label>Category</label>
            <div className="mb-4">
                <input type="text" 
                placeholder="Category"
                value={category}
                required
            onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md" />
            </div>
            <label>Blog Image</label>
            {photoPreview && (<div className="w-full p-2 bg-black-red">
              <img src={photoPreview} alt="" className="h-28 object-cover"/>
            </div>)}
            <div className="mb-4">
                <input type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 border rounded-md" 
                  required
                />
            </div>
            <label>About</label>
            <textarea className="w-full p-2 rounded-md mb-4" value={about} required minLength={200} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
      
            
           
        <button type = "submit" disabled = {pending} className="w-full bg-blue-500 hover:bg-blue-800 duration-300 text-white rounded-md p-2">Create Blog</button>
        </form>
    </div>
    </div>
</>
  )
}

export default CreateBlog