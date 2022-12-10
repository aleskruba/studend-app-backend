import express from "express";
import { users} from "../controllers/user.js";

const router = express.Router()

router.get("/", users)


export default router
