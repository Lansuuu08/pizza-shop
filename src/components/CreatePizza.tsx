import { useState, FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addRecipe } from "../api/recipes"

interface Props {
  page: number
  search: string
  showToast: (msg: string) => void
}

const CreatePizza: React.FC<Props> = ({ page, search, showToast }) => {
  const [name, setName] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", page, search] })
      setName("")
      showToast("Pizza added!")
    },
  })

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    mutation.mutate({ name })
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-amber-50 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 w-full md:w-auto mb-6 transition-transform hover:scale-[1.01]"
    >
      <div className="relative flex-1">
        <input
          type="text"
          id="pizza-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
          className="peer w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        />
        <label
          htmlFor="pizza-name"
          className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-red-500 peer-focus:text-xs bg-amber-50 px-1"
        >
          New pizza name
        </label>
      </div>

      <button
        type="submit"
        className="bg-linear-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 hover:from-green-600 hover:to-green-700 transition"
      >
        Add Pizza
      </button>
    </form>
  )
}

export default CreatePizza
