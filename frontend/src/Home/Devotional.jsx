import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"

function Devotional() {
    const {blogs}= useAuth();
    const devotionalBlogs = blogs.filter((element)=>{return element.category === "Technology"});
    console.log(devotionalBlogs)

  return (
    <div>
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-2xl font-bold mb-6">Devotional</h1>
            <p className="mb-8">The concept of gods varies widely across different cultures,
            religions, and belief systems</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {devotionalBlogs && devotionalBlogs.length >0 ? (
                devotionalBlogs.map((blog, index) => {
                   return ( <Link
                        to = {`/blog/${blog?._id}`}
                        key = {index}
                        className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 duration-300">
                            <img src={blog?.blogImage?.url} alt={blog?.title} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-lg font-semibold">{blog?.title} </h2>
                            <p className="text-sm">{blog?.category}</p>
                            </div>
                        </Link>
                        
                        
                 
            )} )) :
            (
                <div className="flex h-screen items-screen justify-content">
                    Loading.....
                </div>
            )
            }
        </div>
    </div>
    </div>

  )
}

export default Devotional