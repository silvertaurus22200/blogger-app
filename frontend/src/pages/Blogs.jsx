import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"

function Blogs() {

    const {blogs} = useAuth();

  return (
    <div>
        <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">All Blogs goes here!!!</h1>
        <p className="text-center mb-8">The concept of gods varies widely accross different cultures, relegions, and  belief systems</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {blogs && blogs.length > 0 ? (
                blogs.map((blog, index)=> (
                    <Link to = {`/blog/${blog?._id}`}
                    key = {index}
                    className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 duration-300">
                        <img src={blog?.blogImage?.url} alt={blog?.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute bottom-4 left-4 text-white w-[75%]">
                            <h2 className="text-lg font-semibold h-7 text-ellipsis whitespace-nowrap overflow-hidden">{blog?.title}</h2>
                            <p className="text-sm">{blog?.category}</p>
                        </div>
                    </Link>
                ))
            ) : ("")}
        </div>
        </div>
    </div>
  )
}

export default Blogs