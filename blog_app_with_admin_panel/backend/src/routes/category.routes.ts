import { Router } from "express";
import { getCategories, addCategory } from "../controllers/category.controller";

// Define Router
const router = Router();

router.get('/', getCategories);
router.post('/', addCategory);

export default router;