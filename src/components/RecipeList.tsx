import type { Recipe } from "../types/recipe"
import RecipeCard from "./RecipeCard"

type RecipeListProps = {
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  onSelect: (r: Recipe) => void
  showToast: (msg: string) => void
}

export default function RecipeList({
  recipes,
  setRecipes,
  onSelect,
  showToast,
}: RecipeListProps) {
  return (
    
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {recipes.map((recipe: any) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          setRecipes={setRecipes}
          onSelect={onSelect}
          showToast={showToast}
        />
      ))}
    </div>
  )
}
