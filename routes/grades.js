import express from "express";
import { getGrades,addGrade,deleteGrade,updateGrade } from "../controllers/grades.js";

const router = express.Router()

router.get('/:id',getGrades)
router.post('/', addGrade)
router.delete('/:id',deleteGrade)
router.put('/:id',updateGrade)




export default router
