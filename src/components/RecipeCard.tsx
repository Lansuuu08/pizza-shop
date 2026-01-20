import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Recipe } from "../types/recipe"
import { deleteRecipe, updateRecipe } from "../api/recipes"

interface Props {
  recipe: Recipe
  page: number
  search: string
  onSelect: (id: number) => void
  showToast: (msg: string) => void
}

const RecipeCard: React.FC<Props> = ({
  recipe,
  page,
  search,
  onSelect,
  showToast,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(recipe.name)

  const queryClient = useQueryClient()

  /* DELETE */
  const deleteMutation = useMutation({
  mutationFn: deleteRecipe,
  onSuccess: (_, id) => {
    queryClient.setQueryData(
      ["recipes", page, search],
      (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          recipes: oldData.recipes.filter(
            (r: Recipe) => r.id !== id
          ),
        }
      }
    )

    showToast("Recipe deleted")
  },
})


  /* UPDATE */
  const updateMutation = useMutation({
  mutationFn: updateRecipe,
  onSuccess: (updated) => {
    queryClient.setQueryData(
      ["recipes", page, search],
      (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          recipes: oldData.recipes.map((r: Recipe) =>
            r.id === updated.id ? { ...r, name: updated.name } : r
          ),
        }
      }
    )

    setIsEditing(false)
    showToast("Recipe updated")
  },
})

  return (
    <div
      onClick={() => onSelect(recipe.id)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden"
    >
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4 space-y-3">
        {/* NAME */}
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
        ) : (
          <h3 className="font-bold text-xl text-gray-800">{recipe.name}</h3>
        )}

        {/* MEAL TYPE */}
        <div className="flex flex-wrap gap-2">
          {recipe.mealType?.map((type) => (
            <span
              key={type}
              className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div
          className="flex gap-2 mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          {isEditing ? (
            <button
              onClick={() =>
                updateMutation.mutate({ id: recipe.id, name })
              }
              className="bg-linear-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-xl hover:from-green-600 hover:to-green-700 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-linear-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition"
            >
              Update
            </button>
          )}

          <button
            onClick={() => deleteMutation.mutate(recipe.id)}
            className="bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-xl hover:from-red-600 hover:to-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
