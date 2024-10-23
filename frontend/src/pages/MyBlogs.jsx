import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {Link} from "react-router-dom"
import { BACKEND_URL } from '../utility'

function MyBlogs() {

  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(()=> {

    const fetchMyBlogs = async ()=> {

      try {
        const {data} = await axios.get(`${BACKEND_URL}/api/blog/myblogs`,{
          withCredentials : true,
        })
        console.log(data)
        setMyBlogs(data.blogs)
      } catch (error) {
        console.log(error);
        toast.error("error occured while fetching your blogs")
      }
    }

    fetchMyBlogs();

  }, [])

  const handleDelete = async (id)=> {
    await axios
    .delete(`${BACKEND_URL}/api/blog/delete/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
    })
    .catch((error) => {
      toast.error(error.response.message || "Failed to delete blog");
    });
  }

  return (
    <div className='sm:ml-64'>
      <div className='container my-12 mx-auto px-4'>
        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBlogs