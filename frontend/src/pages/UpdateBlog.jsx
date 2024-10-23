import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"

function UpdateBlog() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const[category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [pending, setPending] = useState(false);
  const navigateTo = useNavigate();

  useEffect(()=>{
    const fetchBlog = async () => {
      try {
        const {data} = await axios.get(`http://localhost:3000/api/blog/${id}`,{
          withCredentials : true
        })
        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setPhotoPreview(data.blogImage.url)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlog();
  }, [id])

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category",category);
  formData.append("about", about);
  formData.append("blogImage",blogImage);
  console.log(formData);
  try {
      setPending(true);
      const {data} = await axios.put(`http://localhost:3000/api/blog/update/${id}`,formData,
          {
              headers : {
                  "Content-Type" : "multipart/form-data",
              },
              withCredentials : true
          }
      )
      console.log(data);
      toast.success(data.message || "updated succesfully")
      setPending(false)
      setTitle("")
      setAbout("");
      setCategory("");
      setBlogImage("")
      setPhotoPreview("");
      navigateTo("/dashboard")
  } catch (error) {
      setPending(false)
      console.log(error)
      toast.error(error.response.data.error || "please fill the required fields")
  }
  }

  const changePhotoHandler = (event) => {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setBlogImage(file);
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center bg-gray-100">

    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 h-5/6 overflow-auto">
        <form onSubmit={handleUpdateBlog}>
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
            {photoPreview && (<div className="w-full p-2">
              <img src={photoPreview} alt="" className="h-28 w-full object-cover" />
            </div>)}
            <div className="mb-4">
                <input type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 border rounded-md"
                />
            </div>
            <label>About</label>
            <textarea className="w-full p-2 rounded-md mb-4" value={about} required minLength={200} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
      
            
           
        <button type = "submit" disabled = {pending} className="w-full bg-blue-500 hover:bg-blue-800 duration-300 text-white rounded-md p-2">Update Blog</button>
        </form>
    </div>
    </div>
</>
  )
}

export default UpdateBlog