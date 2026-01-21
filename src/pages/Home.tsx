import { useState, useEffect } from "react"
import { getRecipes } from "../api/recipes"
import CreatePizza from "../components/CreatePizza"
import FilterBar from "../components/FilterBar"
import RecipeList from "../components/RecipeList"
import Toast from "../components/Toast"
import FullRecipe from "../components/FullRecipe"
import type { Recipe } from "../types/recipe"

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>(() => {
    const saved = localStorage.getItem("recipes")
    return saved ? JSON.parse(saved) : []})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Recipe | null>(null)
  const [toast, setToast] = useState("")

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data)
        setLoading(false)
      }
      )
  }, [])

  if (loading) return <p className="text-center text-5xl py-80 font-extrabold text-white bg-amber-200 min-h-screen">MANATILING NAG HIHINTAY</p>

  return (
    <div className="p-10 bg-amber-200 min-h-screen">
      <hr className="p-3 mx-25 border-black"></hr>
      <h1 className="text-8xl font-bold text-center mb-4 font-serif">
        WHAT A NICE RECIPE!
      </h1>
      <hr className="p-3 border-black mx-25"></hr>
      <CreatePizza setRecipes={setRecipes} showToast={setToast} />

      <FilterBar search={search} setSearch={setSearch} />

      <RecipeList
        recipes={filtered}
        setRecipes={setRecipes}
        onSelect={setSelected}
        showToast={setToast}
      />

      {selected && (
        <FullRecipe recipe={selected} onClose={() => setSelected(null)} />
      )}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  )
}
