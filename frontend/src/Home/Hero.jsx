import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';

function Hero() {

    const {blogs} = useAuth();
    console.log(blogs)

  return (
    <div className='container mx-auto my-10 px-6'>
        <h1 className=" text-2xl font-semibold mb-4 ml-2">Hot</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs && blogs.length > 0 ? (
            blogs.slice(0,4).map((element)=>{
                return (
                    <Link to= {`/blog/${element?._id}`} key = {element._id} 
                    className='bg-white rounded-lg hover:shadow-lg overflow-hidden hover:scale-105 duration-300'>
                        <div className='group relative'>
                            <img src={element.blogImage.url} alt="" className='object-cover w-full h-56'/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 duration-300"></div>
                            <h1 className="h-7 w-[75%] overflow-hidden text-ellipsis absolute bottom-4 left-6 text-white text-xl font-bold group-hover:text-yellow-500 duration-300" style={{whiteSpace: "nowrap"}}>{element.title}</h1>
                        </div>
                            <div className="flex items-center p-6">
                                <img src={element.adminPhoto} alt="" 
                                    className='w-12 h-12 rounded-full border-2 border-yellow-400'
                                />
                                <div className='ml-4'>
                                    <p className='text-lg font-semibold text-gray-800'>{element.adminName}</p>
                                    <p className='text-xs text-gray-800'>new</p>
                                </div>
                            </div>
                    </Link>
                )
            })
        ) : ""}
    </div>
    </div>
  )
}

export default Hero