import { Post } from "../models/Post"

export const getAllPost = async () => await Post.findAll()

export const getPostBySlug = async (slug: string) => {
  return await Post.findOne({ where: { slug } })
}

export const getPostById = async (id: number) => {
  return await Post.findByPk(id)
}

export const createPost = async (title: string, content: string, slug: string) => {
  const post = new Post()

  post.title   = title
  post.content = content
  post.slug    = slug

  await post.save()
}

export const updatePost = async (title: string, content: string, slug: string, id: number) => {
  const post = await Post.findByPk(id)

  try {
    if(!post) throw 'Invalid Post Id';


    post.title = title
    post.content = content
    post.slug = slug
    
    await post?.save()
  }catch(err){

  }
}
