import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getRecipesPaginated, searchRecipes } from "../api/recipes"
import RecipeList from "../components/RecipeList"
import FilterBar from "../components/FilterBar"
import CreatePizza from "../components/CreatePizza"
import FullRecipe from "../components/FullRecipe"
import Toast from "../components/Toast"

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [toast, setToast] = useState<string>("")

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(""), 2500)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", page, search],
    queryFn: () =>
      search.trim()
        ? searchRecipes(search)
        : getRecipesPaginated(page),
  })

  if (isLoading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold">
        Loading pizzas...
      </p>
    )
  }

  const recipes = data?.recipes ?? []

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <Toast message={toast} />

        <h1 className="text-4xl font-extrabold text-center mb-8">
          🍕 Pizza Shop CRUD
        </h1>

        <CreatePizza page={page} search={search} showToast={showToast} />

        <FilterBar search={search} setSearch={setSearch} />

        <RecipeList
          recipes={recipes}
          page={page}
          search={search}
          onSelect={setSelectedId}
          showToast={showToast}
        />

        {!search && (
          <div className="flex justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-white rounded-2xl shadow hover:shadow-md disabled:opacity-40 transition"
            >
              ◀ Prev
            </button>

            <span className="font-semibold text-lg">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white rounded-2xl shadow hover:shadow-md transition"
            >
              Next ▶
            </button>
          </div>
        )}

        <FullRecipe recipeId={selectedId} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  )
}
