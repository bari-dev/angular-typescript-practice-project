import { Router } from "express";
import { addPost, getPosts } from "../controllers/post.controller";



const router = Router()

router.get('/', getPosts)
router.post('/', addPost)
router.put('/', getPosts)
router.delete('/', getPosts)

export default router