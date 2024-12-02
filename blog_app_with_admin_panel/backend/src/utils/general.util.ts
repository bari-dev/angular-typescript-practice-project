
export const generateSlug = (text: string, isUnique: boolean = false) => {
  let slug = text.toLowerCase().replace(' ', '-');

  if (isUnique)
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`

  return slug;
}