import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

function Register() {

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const [education, setEducation] = useState("");
    const [photo, setPhoto] = useState("");
    const [photoPreview,setPhotoPreview] = useState("");

    const changePhotoHandler = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=> {
                setPhotoPreview(reader.result);
                console.log(reader)
                setPhoto(file);
            }
    }

    const handleRegister  = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",name);
        formData.append("role",role);
        formData.append("education", education);
        formData.append("phone", phone)
        formData.append("password", password);
        formData.append("email",email);
        formData.append("photo",photo);
        try {
            const {data} = await axios.post("http://localhost:3000/api/user/register",formData,
                {
                    headers : {
                        "Content-Type" : "multipart/form-data",
                    }
                }
            )
            console.log(data);
            toast.success(data.message || "registered succesfully")
            setName("")
            setRole("");
            setEducation("");
            setPhone("");
            setEmail("");
            setPassword("");
            setPhoto("");
            setPhotoPreview("");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error || "please fill the required fields")
        }
    }

  return (
    <>
        <div className="h-screen flex justify-center items-center bg-gray-100">

        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
            <form onSubmit={handleRegister}>
                <div className="font-semibold text-xl    text-center">
                    My<span className="text-blue-500">Blog</span>
                </div>
                <h1 className="font-semmibold text-xl mb-6">Register</h1>
                <select className="w-full border rounded-md p-2 mb-4"
                value={role}
                onChange={(e)=>{setRole(e.target.value)}}>
                    <option value = "">Select Role</option>
                    <option value = "user">User</option>
                    <option value = "admin">Admin Role</option>
                </select>
                <div className="mb-4">
                    <input type="text" 
                    placeholder="Your name"
                    value = {name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className="w-full p-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <input type="email" 
                    placeholder="Your Email"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <input type="number" 
                    placeholder="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <input type="password" 
                    placeholder="Your Password"
                    value = {password}
                    onChange = {(e)=> {setPassword(e.target.value)}}
                    className="w-full p-2 border rounded-md" />
                </div>
                <select className="w-full border rounded-md p-2 mb-4"
                    value = {education}
                    onChange = {(e)=>{setEducation(e.target.value)}}
                >
                    <option value= "">Select Your Education</option>
                    <option value= "b.tech">B.tech</option>
                    <option value= "bca">BCA</option>
                    <option value= "mca">MCA</option>
                    <option value= "mba">MBA</option>
                </select>
                <div className="flex items-center mb-4">
                   {photoPreview && ( <div className= "w-[30%]">
                        <img src={photoPreview ? `${photoPreview}` : "photo"}
                         alt="" />
                    </div>)}
                    <input type="file"
                    onChange={changePhotoHandler}
                    className="w-[70%]" />
                </div>
                <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600">
                Login Now
              </Link>
            </p>
            <button type = "submit" className="w-full bg-blue-500 hover:bg-blue-800 duration-300 text-white rounded-md p-2">Register</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default Register