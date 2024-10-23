import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utility";


const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [blogs,setBlogs] = useState([]);
    const [profile, setProfile] = useState();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(()=>{

        const fetchProfile = async () => {
            try {
                const {data} = await axios.get(`${BACKEND_URL}/api/user/profile`,
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
                const response = await axios.get(`${BACKEND_URL}/api/blog/blogs`);
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