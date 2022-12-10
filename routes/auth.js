import express from "express";
import { login, logout, register, updateProfile,getUsers,deleteUser } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login",login)
router.put("/updateuser/:id",updateProfile)
router.post("/logout",logout)
router.get("/users/:id",getUsers)
router.delete("/:id",deleteUser)




export default router
