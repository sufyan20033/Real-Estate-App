import express from "express"
import { addpost, getAllPosts, getSinglePost } from "../controller/Propertycontrol.js";
const router = express.Router();

router.post("/addpost", addpost)
router.get("/", getAllPosts);
router.get('/:id', getSinglePost);

export default router;