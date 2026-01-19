import RecipeCard from "./RecipeCard"
import { Recipe } from "../types/recipe"

interface Props {
  recipes: Recipe[]
  page: number
  search: string
  onSelect: (id: number) => void
  showToast: (msg: string) => void
}

const RecipeList: React.FC<Props> = ({ recipes, page, search, onSelect, showToast }) => {
  if (!recipes.length) {
    return <p className="text-center text-gray-500 mt-10 text-lg">No pizzas found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          page={page}
          search={search}
          onSelect={onSelect}
          showToast={showToast}
        />
      ))}
    </div>
  )
}

export default RecipeList
