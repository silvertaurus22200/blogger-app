import { useEffect, useState } from "react"
import  axios from "axios"
import { BACKEND_URL } from "../utility";

function Creators() {
    const [admins , setAdmins] = useState([]);

    useEffect(()=>{
        const fetchAdmins = async ()=>{
            const {data} = await axios.get(`${BACKEND_URL}/api/user/admins`)
            setAdmins(data.admins);
        }
        fetchAdmins();
    },[])

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
        {admins.map((admin)=>{
            return (
                <div key = {admin._id} className="border overflow-hidden bg-white shadow-lg rounded-lg">
            <div className="relative border">
            <img src={admin.photo.url} alt="photo" className="h-48 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
              <img
                src={admin.photo.url}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700 object-cover"
              />
            </div>
            </div>
            <div className="px-4 py-6 mt-4">
                <h2 className="text-center text-xl font-semibold text-gray-800">{admin.name}</h2>
                <p className="text-center text-gray-600 mt-2">{admin.email}</p>
                <p className="text-center text-gray-600 mt-2">{admin.phone}</p>
                <p className="text-center text-gray-600 mt-2">Author</p>
            </div>
        </div>
            )
        })}
    </div>
  )
}

export default Creators