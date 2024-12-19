import express from "express"
const router = express.Router();
import { createuser, getuser, loginUser, logout } from "../controller/authcontrol.js"

router.post("/signup", createuser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/user/:id", getuser);



export default router