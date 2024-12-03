import { Router } from "express";
import { 
  getAllPostController, 
  getPostController,
  createPostController,
  updatePostController,
  deletePostController
} from "../controllers/post.controller";



const router = Router()

router.get('/', getAllPostController)
router.get('/:id', getPostController)
router.post('/', createPostController)
router.put('/', updatePostController)
router.delete('/', deletePostController)

export default router