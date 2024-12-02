import { Request, Response } from "express";
import { createPost, getAllPost, getPostBySlug } from "../services/post.service";
import z from 'zod'
import { generateSlug } from "../utils/general.util";

export const getPosts = async (req: Request, res: Response) => {
  res.json(await getAllPost())
}

export const addPost = async (req: Request, res: Response) => {
  const schema = z.object({
    title: z.string(),
    content: z.string()
  })

  const schemaValidator = schema.safeParse(req.body)

  if(!schemaValidator.success){
    res.status(404).json({ message: "Invalid Data", errors: schemaValidator.error })
    return
  }

  const { title, content } = req.body
  const userId = 1
  let slug = generateSlug(title)
  const postBySlug = await getPostBySlug(slug)
  if(postBySlug) slug = generateSlug(slug, true)
  const post = await createPost(title, content, slug)
  res.json(post)
}
