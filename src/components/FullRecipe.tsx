export default function FullRecipe({ recipe, onClose }: any) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-amber-200 p-10 rounded max-w-md">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
        <p className="mt-2 font-mono">
        Ingredients: {recipe.ingredients.join(", ")}
        </p>
        <p className="mt-2 font-mono"> Instructions: {recipe.instructions}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:scale-110 transition-transform"
        >
          Close
        </button>
      </div>
    </div>
  )
}
