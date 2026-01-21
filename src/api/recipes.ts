import type { Recipe } from "../types/recipe"

const BASE_URL = "https://dummyjson.com"

export async function getRecipes() {
  const res = await fetch(`${BASE_URL}/recipes`)
  const data = await res.json()
  return data.recipes
}

export async function createRecipe(recipe: Recipe) {
  const res = await fetch(`${BASE_URL}/recipes/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
  const data = await res.json()
  return data
}

export async function updateRecipe(id: number, updates: Partial<Recipe>) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })
  const data = await res.json()
  return data
}

export async function deleteRecipe(id: number) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "DELETE",
  })
  const data = await res.json()
  return data
}

export async function getRecipeById(id: number) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`)
  const data = await res.json()
  return data
}

export async function searchRecipes(query: string) {
  const res = await fetch(`${BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data.recipes
}

export async function getTags() {
  const res = await fetch(`${BASE_URL}/recipes/tags`)
  const data = await res.json()
  return data.tags
}

export async function getMealTypes() {
  const res = await fetch(`${BASE_URL}/recipes/mealTypes`)
  const data = await res.json()
  return data.mealTypes
}