import { Post } from "../models/Post"



export const getAllPost = async () => await Post.findAll()

export const getPostBySlug = async (slug: string) => {
  return await Post.findOne({ where: { slug } })
}


export const createPost = async (title: string, content: string, slug: string) => {
  const post = new Post()

  post.title   = title
  post.content = content
  post.slug    = slug

  await post.save()
  
}