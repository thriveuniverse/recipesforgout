// src/components/recipe-card.tsx   ← overwrite the entire file
export function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
        <span className="text-6xl opacity-30">Plate</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{recipe.title}</h3>
        <div className="flex gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${recipe.purine < 75 ? "bg-green-600" : recipe.purine < 150 ? "bg-amber-600" : "bg-red-600"}`}>
            {recipe.purine} mg purines
          </span>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{recipe.time} min</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((t: string) => (
            <span key={t} className="text-xs bg-amber-500/30 px-2 py-1 rounded">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}