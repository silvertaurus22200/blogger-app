import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utility";


function Navbar() {

    const {authenticated, setAuthenticated, setProfile, profile} = useAuth();
    const [show, setShow] = useState(false);
    const navigateTo = useNavigate();

    const handleLogout = async ()=> {
        
        try {
            await axios.post(`${BACKEND_URL}/api/user/logout`,{},{withCredentials : true}
            );
            setProfile(null)
            setAuthenticated(false);
            console.log("profile", profile);
            console.log("auth",authenticated)
            toast.success("successfully logged out")
            navigateTo("/")
        } catch (error) {
            console.log(error);
            toast.error("failed to logout")
        }
    }

  return (<>
    <nav className="shadow-lg py-2 px-4 sticky top-0 z-20">
        <div className= "flex justify-between items-center container mx-auto">
        <div className="font-semibold text-xl">
            My<span className="text-blue-500">Blog</span>
        </div>
        <div className="">
            <ul className="hidden md:flex space-x-6">
                <Link to = "/" className="hover:text-blue-500">HOME</Link>
                <Link to = "/blogs" className="hover:text-blue-500">BLOGS</Link>
                <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
                <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
                <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
            </ul>
            <div className="md:hidden cursor-pointer" onClick={()=> {setShow(!show)}}>
            {show ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
            </div>
        </div>
        <div className="space-x-3">
            {authenticated && profile?.role==="admin" ? (<Link to="/dashboard"  className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded">DASHBOARD</Link>): ("")}
            {authenticated ? (<button onClick={()=>{handleLogout()}} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded">LOGOUT</button>)
            : (<Link to="/login" className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded">LOGIN</Link>
)}
        </div>
        
        </div>
        {show && (
            <div className="absolute top-11 left-0 right-0 z-10 bg-gray-200">
            <ul className="flex flex-col justify-center items-center h-96 space-y-2">
                <Link to = "/" onClick={()=> {setShow(!show)}} className="text-blue-500">HOME</Link>
                <Link to = "/blogs" onClick={()=> {setShow(!show)}} className="text-blue-500">BLOGS</Link>
                <Link to="/about" onClick={()=> {setShow(!show)}} className="text-blue-500">ABOUT</Link>
                <Link to="/creators" onClick={()=> {setShow(!show)}} className="text-blue-500">CREATORS</Link>
                <Link to="/contact" onClick={()=> {setShow(!show)}} className="text-blue-500">CONTACT</Link>
            </ul>
        </div>
        )}
    </nav>
  </>   
  )
}

export default Navbar