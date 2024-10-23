import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";


const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [blogs,setBlogs] = useState([]);
    const [profile, setProfile] = useState();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(()=>{

        const fetchProfile = async () => {
            try {
                const {data} = await axios.get("http://localhost:3000/api/user/profile",
                    {
                        withCredentials : true,
                    }
                );
                setProfile(data.user);
                setAuthenticated(true);

            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile();

        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/blog/blogs");
                setBlogs(response.data.blogs)

            } catch (error) {
                toast.error(error?.response?.data?.error || "could not fetch blogs")
            }
        }
        fetchBlogs();
    },[authenticated])

    return (
        <AuthContext.Provider
        value = {{authenticated, setAuthenticated, setProfile, profile, blogs}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = ()=> {return useContext(AuthContext)};

export default AuthProvider;