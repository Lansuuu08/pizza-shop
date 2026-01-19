import axios from "axios"

export interface Recipe {
  id: number
  name: string
  image?: string
  mealType?: string[]
  ingredients?: string[]
  instructions?: string
}

export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}

const BASE_URL = "https://dummyjson.com/recipes"
export const PAGE_SIZE = 6

export const getRecipesPaginated = async (page: number): Promise<RecipesResponse> => {
  const limit = PAGE_SIZE
  const skip = (page - 1) * limit
  const { data } = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  return data
}

export const searchRecipes = async (query: string): Promise<RecipesResponse> => {
  const q = encodeURIComponent(query)
  const { data } = await axios.get(`${BASE_URL}/search?q=${q}`)
  return data
}

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error("Failed to fetch recipe")
  return response.json()
}

export const addRecipe = async ({ name }: { name: string }): Promise<Recipe> => {
  const { data } = await axios.post(`${BASE_URL}/add`, { name })
  return data
}

export const deleteRecipe = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}

export const updateRecipe = async ({
  id,
  name,
}: {
  id: number
  name: string
}): Promise<Recipe> => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, { name })
  return data
}
