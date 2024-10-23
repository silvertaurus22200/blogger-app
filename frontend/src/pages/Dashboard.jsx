import CreateBlog from "./CreateBlog";
import MyBlogs from "./MyBlogs";
import MyProfile from "./MyProfile";
import Sidebar from "./Sidebar"
import UpdateBlog from "./UpdateBlog";
import {useState} from "react";

function Dashboard() {

    const [component ,setComponent] = useState("My Blogs");
    
  return (
    <div>
        <Sidebar setComponent = {setComponent} />
        {component === "My Profile" ? 
        (<MyProfile />)
        : component === "Create Blog" ?
        (<CreateBlog />)
        : component === "Update Blog" ?
        (<UpdateBlog />)
        : 
        (<MyBlogs />)
        }
    </div>
  )
}

export default Dashboard