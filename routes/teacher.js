import express from "express";
import { teacher} from "../controllers/teacher.js";

const router = express.Router()

router.get('/',teacher)



export default router