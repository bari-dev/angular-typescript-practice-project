import { Request, Response } from "express";
import { getAllCategories, createCategory, getCategoryBySlug } from "../services/category.service";
import { generateSlug } from "../utils/general.util";
import z from 'zod';

export const getCategories = async (req: Request, res: Response) => {
  res.json(await getAllCategories());
}

export const addCategory = async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string()
  })

  const schemaValidator = schema.safeParse(req.body)

  if(!schemaValidator.success){
    res.status(400).json({ message: 'Invalid data', errors: schemaValidator.error })
    return 
  }

  const { name } = req.body
  const userId = 1
  let slug = generateSlug(name)
  const categoryBySlug = await getCategoryBySlug(slug)
  if(categoryBySlug) slug = generateSlug(slug, true)
  const category = await createCategory(name, userId, slug)
  res.json(category)
}
