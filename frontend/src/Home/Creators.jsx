import axios from 'axios';
import { useState, useEffect } from 'react';

function Creators() {

    const [admins, setAdmins] = useState([]);

    useEffect(()=>{
        const fetchAdmins = async ()=>{
            const {data} = await axios.get("http://localhost:3000/api/user/admins",
                {
                    withCredentials : true,
                }
            )
            setAdmins(data.admins)
        }
        fetchAdmins();
    },[])

  return (
    <div className='container mx-auto p-6'>
    <h1 className='font-bold text-2xl mb-8'>Popular Creators</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full">
    {admins && admins.length > 0 ? (
        admins.slice(0,4).map(admin => {
            return (
                <div key = {admin._id} className='mx-auto'>
                    <img src={admin.photo.url} alt="photo" className=" h-44 w-44 object-cover border-2 border-black  rounded-full" />
                    <div className="text-center mt-3 w-44">
                    <p>{admin.name}</p>
                    <p className="text-gray-600 text-xs">{admin.role}</p>
                  </div>
                </div>
            )
        })
    ) : (<div>loading......</div>)}
    </div>
    </div>
    
  )
}

export default Creators