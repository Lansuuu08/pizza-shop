import { Recipe } from "../types/recipe"

const BASE_URL = "https://dummyjson.com/recipes"

/* ---------------- READ ---------------- */

export async function getRecipesPaginated(page: number) {
  const limit = 6
  const skip = (page - 1) * limit

  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error("Failed to fetch recipes")

  return res.json()
}

export async function searchRecipes(search: string) {
  const res = await fetch(`${BASE_URL}/search?q=${search}`)
  if (!res.ok) throw new Error("Failed to search recipes")

  return res.json()
}

export async function getRecipeById(id: number): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error("Recipe not found")

  return res.json()
}

/* ---------------- CREATE ---------------- */

export async function addRecipe(recipe: any) {
  const res = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  })

  return res.json()
}

/* ---------------- UPDATE ---------------- */

export async function updateRecipe(data: { id: number; name: string }) {
  const res = await fetch(`${BASE_URL}/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
    }),
  })

  if (!res.ok) throw new Error("Failed to update recipe")
  return res.json()
}

/* ---------------- DELETE ---------------- */

export async function deleteRecipe(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to delete recipe")
  return res.json()
}
