import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (<>

    <footer className="border py-10">

    <div  className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Flutter</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">React</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Android</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">iOS</a>
                </li>
            </ul>
        </div>
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Design to code</h2>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white"> Figma plugin</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Templates</a>
                </li>
            </ul>
        </div>
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Comparison</h2>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">DhiWise vs Anima</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">DhiWise vs Appsmith</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white"> DhiWise vs Monday Hero</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">DhiWise vs Retool</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white"> DhiWise vs Bubble</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">DhiWise vs Figma Dev Model</a>
                </li>
            </ul>
        </div>
        <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Career</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                </li>
                <li>
                    <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                </li>
            </ul>
        </div>
    </div>
    </footer>
    <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center px-2">
        <div className="text-xl font-semibold hidden md:flex">
          My<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>MyBlog</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <BsYoutube className="h-6" />
          </a>

          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
  </>
  )
}

export default Footer