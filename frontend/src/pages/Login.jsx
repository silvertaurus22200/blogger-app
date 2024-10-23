import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthProvider";

function Login() {

    const {setAuthenticated} = useAuth();

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
            e.preventDefault();

            try {
                const {data} = await axios.post("http://localhost:3000/api/user/login",
                    {
                        role,
                        email,
                        password
                    },
                    {
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        withCredentials :true,
                    }
                )
                console.log(data);
                toast.success(data.message || "login successful")
                setAuthenticated(true);
                navigateTo("/")
                setEmail("");
                setRole("");
                setPassword("");
            } catch (error) {
                console.log("error", error);
                toast.error(error.response.data.error)
            }

    }
 
  return (
    <div className='h-screen bg-gray-100 flex justify-center items-center'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
            <form onSubmit = {handleLogin}>
                <div className="font-semibold text-xl    text-center">
                    My<span className="text-blue-500">Blog</span>
                </div>
                <h1 className="font-semmibold text-xl mb-6">Login</h1>
                <select value={role}
                onChange={(e)=>{setRole(e.target.value)}}
                className="w-full p-2 border rounded-md mb-4">
                    <option value = "">Select Role</option>
                    <option value = "admin">Admin</option>
                    <option value = "user">User</option>
                </select>
                <div className="mb-4">
                    <input type="text"
                    value={email}
                    onChange = {(e)=>{setEmail(e.target.value)}} 
                    placeholder="Your Email"
                    className="w-full rounded-md border p-2"/>
                </div>
                <div className="mb-4">
                    <input type="password" 
                    placeholder="Your Password"
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}}
                    className="w-full rounded-md border p-2"/>
                </div>
                <p className="text-center mb-4">
                Not registered?{" "}
                <Link to={"/register"} className="text-blue-600">
                Register Now
                </Link>
                </p>
                <button type="submit"
                className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-800 duration-300">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login