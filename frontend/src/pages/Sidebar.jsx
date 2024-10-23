import { useAuth } from "../context/AuthProvider"
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utility";

function Sidebar({setComponent}) {

    const {setAuthenticated, setProfile, profile} = useAuth();

    const [show,setShow] = useState(false);
    const navigateTo = useNavigate();

    const handleComponents = (value) => {
        setComponent(value);
    }

    const gotoHome = () => {
        navigateTo("/");
    }

    const handleLogout = async () => {

        try {
            await axios.post(`${BACKEND_URL}/api/user/logout`,{},{withCredentials : true}
            );
            setProfile(null)
            setAuthenticated(false);
            toast.success("successfully logged out")
            navigateTo("/")
        } catch (error) {
            console.log(error);
            toast.error("failed to logout")
        }
    }

    console.log(profile)

  return (
    <>
    <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        {show ? (<BiSolidLeftArrowAlt className="text-2xl" />) :<CiMenuBurger className="text-2xl" /> }     
    </div>
       <div className={`w-64 h-full shadow-lg fixed top-0 left-0 duration-300 sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"} z-10 bg-white`}>
            <div className="text-center">
                <img className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" src={profile?.photo?.url} alt="" />
                <p className="text-lg font-semibold" >{profile?.name}</p>
            </div>
            <ul className="space-y-6 mx-4">
                <button  onClick = {()=>{handleComponents("My Blogs")}} className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 duration-300">MY BLOGS</button>
                <button  onClick = {()=>{handleComponents("Create Blog")}} className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 duration-300">CREATE BLOG</button>
                <button  onClick = {()=>{handleComponents("My Profile")}} className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 duration-300">MY PROFILE</button>
                <button onClick={gotoHome} className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 duration-300">HOME</button>
                <button  onClick = {handleLogout} className="w-full px-4 py-2  bg-yellow-500 rounded-lg hover:bg-yellow-700 duration-300">LOG OUT</button>
            </ul>
       </div>
    </>
  )
}

export default Sidebar