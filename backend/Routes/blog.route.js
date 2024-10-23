import express from "express"
import blogController from "../controllers/blog.controller.js"
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/create", authUser.isAuthenticated,authUser.isAdmin("admin"), blogController.createBlog);
router.delete("/delete/:id", authUser.isAuthenticated, authUser.isAdmin("admin"), blogController.deleteBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/myblogs", authUser.isAuthenticated, authUser.isAdmin("admin"), blogController.getMyBlogs)
router.get("/:id", blogController.getSingleBlog);
router.put("/update/:id", authUser.isAuthenticated, authUser.isAdmin("admin"), blogController.updateBlog)

export default router;