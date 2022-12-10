import express from "express";
import { addReply,getReplies,deleteReply} from "../controllers/replies.js";

const router = express.Router()

router.get('/',getReplies)
router.post('/',addReply)
router.delete('/:id',deleteReply)


export default router
