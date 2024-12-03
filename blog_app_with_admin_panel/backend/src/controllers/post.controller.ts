import { Request, Response } from "express";
import { createPost, getAllPost, getPostBySlug, getPostById} from "../services/post.service";
import z from 'zod'
import { generateSlug } from "../utils/general.util";

export const getAllPostController = async (req: Request, res: Response) => {
  res.json(await getAllPost())
}

export const getPostController = async (req: Request, res: Response) => {
  res.json(await getPostById(Number(req.params.id)))
}

export const createPostController = async (req: Request, res: Response) => {
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


export const updatePostController = async (req: Request, res: Response) => {}
export const deletePostController = async (req: Request, res: Response) => {}
