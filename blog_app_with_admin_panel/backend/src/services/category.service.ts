import { Category } from "../models/Category";

export const getAllCategories = async () => await Category.findAll();


export const createCategory = async (
  name: string,
  userId: number,
  slug: string
) => {
  const category = new Category()

  category.title = name
  category.userId = userId
  category.slug = slug

  await category.save();

  return category;
}


// helping methods
export const getCategoryBySlug = async (slug: string) => {
  return await Category.findOne({ where: { slug } })
}