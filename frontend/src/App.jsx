import Navbar from "./components/Navbar"
import { Route, Routes, useLocation} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast"
import Home from "./components/Home";
import Footer from "./components/Footer";
import Creators from "./pages/Creators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import UpdateBlog from "./pages/UpdateBlog";
import Blogs from "./pages/Blogs";
import Detail from "./pages/Detail";
import { useAuth } from "./context/AuthProvider";
import NotFound from "./pages/NotFound";


function App() {

  const {authenticated} = useAuth();
  const location = useLocation();
  const regex = /^\/blog\/update\/.+/
  const hideNavbarFooter = ["/register", "/login","/dashboard"].includes(location.pathname) || regex.test(location.pathname);

  console.log(location)

  return (
    <>
 
      {!hideNavbarFooter && <Navbar /> }               

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/creators" element = {<Creators />} />
          <Route path = "/about" element={<About />} />
          <Route path = "/contact" element={<Contact />} />
          <Route path = "/dashboard" element={authenticated ? <Dashboard /> : <NotFound />} />
          <Route path = "/blog/update/:id" element={<UpdateBlog />} />
          <Route path = "/blogs" element={<Blogs />} />
          <Route path = "/blog/:id" element={authenticated ? <Detail /> : <Login />} />
          <Route path = "*" element={<NotFound />} />
        </Routes>

        {!hideNavbarFooter && <Footer /> }       
        <Toaster />

    </>
  )
}

export default App
