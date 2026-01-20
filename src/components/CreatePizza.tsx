import { useState, FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addRecipe } from "../api/recipes"

interface Props {
  page: number
  search: string
  showToast: (msg: string) => void
}

const CreatePizza: React.FC<Props> = ({ page, search, showToast }) => {
  const queryClient = useQueryClient()

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [mealType, setMealType] = useState("Dinner")

  const mutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: (newRecipe) => {
      queryClient.setQueryData(
        ["recipes", page, search],
        (oldData: any) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            recipes: [newRecipe, ...oldData.recipes],
          }
        }
      )

      setName("")
      setImage("")
      setIngredients("")
      setInstructions("")
      showToast("Pizza added!")
    },
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    mutation.mutate({
      name,
      image,
      ingredients: ingredients.split(",").map(i => i.trim()),
      instructions,
      mealType: [mealType],
    })
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-amber-50 rounded-2xl shadow-lg p-6 mb-6 space-y-4"
    >
      <h2 className="text-xl font-bold">Add New Recipe</h2>

      <input
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
        required
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
      />

      <input
        placeholder="Ingredients (with comma)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
      />

      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snack</option>
        <option>Side Dish</option>
        <option>Appetizer</option>
        <option>Beverage</option>
      </select>

      <button
        type="submit"
        className="bg-green-400 text-white px-6 py-2 rounded-xl hover:bg-green-700"
      >
        Add Recipe
      </button>
    </form>
  )
}

export default CreatePizza
