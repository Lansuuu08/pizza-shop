import { useState } from "react"
import { deleteRecipe as deleteRecipeAPI, updateRecipe } from "../api/recipes"
import type { Recipe } from "../types/recipe"

type RecipeCardProps = {
  recipe: Recipe
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  onSelect: (r: Recipe) => void
  showToast: (msg: string) => void
}

export default function RecipeCard({
  recipe,
  setRecipes,
  onSelect,
  showToast,
}: RecipeCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedRecipe, setEditedRecipe] = useState<Recipe>({ ...recipe })
  const [confirmAction, setConfirmAction] = useState<null | "save" | "delete">(null)

  const openEditModal = () => {
    setEditedRecipe({ ...recipe })
    setIsEditing(true)
  }

  const handleChange = (field: keyof Recipe, value: any) => {
    setEditedRecipe((prev) => ({ ...prev, [field]: value }))
  }

  const deleteRecipe = () => {
    setConfirmAction("delete") 
  }

  const saveUpdate = () => {
    setConfirmAction("save") 
  }

  const handleConfirm = async () => {
    if (confirmAction === "save") {
      if (!editedRecipe.name.trim()) return
      try {
        await updateRecipe(recipe.id, editedRecipe)
        setRecipes((prev) => {
          const updated = prev.map((r) => (r.id === recipe.id ? { ...editedRecipe } : r))
          localStorage.setItem("recipes", JSON.stringify(updated))
          return updated
        })
        setIsEditing(false)
        showToast("Recipe updated successfully")
      } catch (error) {
        showToast("Failed to update recipe")
      }
    } else if (confirmAction === "delete") {
      try {
        await deleteRecipeAPI(recipe.id)
        setRecipes((prev) => {
          const updated = prev.filter((r) => r.id !== recipe.id)
          localStorage.setItem("recipes", JSON.stringify(updated))
          return updated
        })
        showToast("Recipe deleted successfully")
      } catch (error) {
        showToast("Failed to delete recipe")
      }
    }
    setConfirmAction(null)
  }

  const handleCancel = () => {
    setConfirmAction(null)
  }

  return (
    <>
      <div className="bg-green-50 rounded shadow p-3 border-2 hover:scale-105 transition-transform h-full relative">
        <img
          src={recipe.image}
          className="h-40 w-full object-cover rounded"
          alt={recipe.name}
        />

        <h3 className="font-bold mt-2 font-mono text-center">{recipe.name}</h3>

        <div className="text-center mt-2">
          {recipe.tags &&
            recipe.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mt-1"
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="text-center mt-2">
          {recipe.mealType &&
            recipe.mealType.map((type: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mt-1"
              >
                {type}
              </span>
            ))}
        </div>

        <div className="flex gap-2 mt-3 justify-center flex-wrap">
          <button
            onClick={openEditModal}
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:scale-110 transition-transform cursor-pointer"
          >
            Update
          </button>

          <button
            onClick={deleteRecipe}
            className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 transition-transform cursor-pointer"
          >
            Delete
          </button>

          <button
            onClick={() => onSelect(recipe)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-110 transition-transform cursor-pointer"
          >
            View
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Recipe</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Pizza Name"
                className="border px-2 py-1 rounded w-full"
                value={editedRecipe.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <input
                type="text"
                placeholder="Image URL"
                className="border px-2 py-1 rounded w-full"
                value={editedRecipe.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />

              <input
                type="text"
                placeholder="Meal Type (comma separated)"
                className="border px-2 py-1 rounded w-full"
                value={editedRecipe.mealType?.join(", ") || ""}
                onChange={(e) =>
                  handleChange(
                    "mealType",
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
              />

              <textarea
                placeholder="Ingredients (comma separated)"
                className="border px-2 py-1 rounded w-full"
                value={editedRecipe.ingredients?.join(", ") || ""}
                onChange={(e) =>
                  handleChange(
                    "ingredients",
                    e.target.value.split(",").map((i) => i.trim())
                  )
                }
              />

              <textarea
                placeholder="Instructions"
                className="border px-2 py-1 rounded w-full"
                value={editedRecipe.instructions || ""}
                onChange={(e) => handleChange("instructions", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={saveUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-amber-200 rounded-lg p-6 w-80 shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">
              {confirmAction === "save"
                ? "Are you sure you want to save changes?"
                : "Are you sure you want to delete this recipe?"}
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
