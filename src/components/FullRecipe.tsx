import { useQuery } from "@tanstack/react-query"
import { getRecipeById } from "../api/recipes"
import { Recipe } from "../types/recipe"

interface Props {
  recipeId: number | null
  onClose: () => void
}

const FullRecipe: React.FC<Props> = ({ recipeId, onClose }) => {
  const { data, isLoading } = useQuery<Recipe>({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId as number),
    enabled: !!recipeId,
  })

  if (!recipeId) return null
  if (isLoading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 relative shadow-2xl transform transition-transform hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold mb-4 text-center">{data?.name}</h2>

        {data?.image && (
          <img
            src={data.image}
            alt={data.name}
            className="rounded-2xl mb-4 w-full object-cover max-h-96 mx-auto"
          />
        )}

        <div className="space-y-3 text-gray-700">
          {data?.mealType && (
            <p>
              <b>Meal Type:</b>{" "}
              {data.mealType.map((t) => (
                <span
                  key={t}
                  className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full mr-2 text-sm"
                >
                  {t}
                </span>
              ))}
            </p>
          )}

          {data?.ingredients && (
            <p>
              <b>Ingredients:</b>{" "}
              {data.ingredients.map((i) => (
                <span
                  key={i}
                  className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2 text-sm"
                >
                  {i}
                </span>
              ))}
            </p>
          )}

          {data?.instructions && (
            <p>
              <b>Instructions:</b> {data.instructions}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FullRecipe
