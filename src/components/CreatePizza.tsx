import { useState } from "react"
import { createRecipe } from "../api/recipes"

export default function CreatePizza({ setRecipes, showToast }: any) {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [mealType, setMealType] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")

  const addPizza = async () => {
    if (!name || !image || !mealType || !ingredients || !instructions) {
      setError("All fields are required")
      return
    }

    const isValidImage =
      image.startsWith("https") &&
      (image.endsWith(""))

    if (!isValidImage) {
      setError("Image URL")
      return
    }

    const newPizza = {
      id: Date.now(),
      name,
      image,
      mealType: [mealType],
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      caloriesPerServing: 0,
      calorieRanges: [],
      calorieCount: 0,
      tags: [],
    }

    try {
      await createRecipe(newPizza)
      setRecipes((prev: any[]) => {
        const updated = [newPizza, ...prev]
        localStorage.setItem("recipes", JSON.stringify(updated))
        return updated
      })

      setName("")
      setImage("")
      setMealType("")
      setIngredients("")
      setInstructions("")
      setError("")
      setShowForm(false)
      showToast("Recipe added successfully")
    } catch (err) {
      setError("Failed to add recipe. Please try again.")
    }
  }

  return (
    <>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded ml-auto block hover:scale-110 transition-transform cursor-pointer mb-4"
        >
          Add Recipe
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className=" bg-amber-200 w-full max-w-md p-6 rounded-xl shadow-lg space-y-3 relative">

            <h2 className="text-xl font-bold text-center">
              Add New Recipe
            </h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <input
              className="border w-full px-3 py-2 rounded bg-white"
              placeholder="Pizza name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border w-full px-3 py-2 rounded bg-white"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <select
              className="border w-full px-3 py-2 rounded bg-white"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Select meal type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>

            <input
              className="border w-full px-3 py-2 rounded bg-white"
              placeholder="Ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />

            <textarea
              className="border w-full px-3 py-2 rounded bg-white"
              placeholder="Instructions"
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowForm(false)
                  setError("")
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={addPizza}
                className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
