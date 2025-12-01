// src/components/recipe-card.tsx  ← FINAL FINAL FINAL
export function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl text-white/25 font-light tracking-widest">Plate</span>
        </div>
      </div>
      <div className="p-6 pt-8">   {/* ← THIS IS THE ONLY CHANGE: pt-8 */}
        <h3 className="text-xl font-bold text-charcoal mb-3 leading-tight">
          {recipe.title}
        </h3>
        <div className="flex gap-3 mb-3">
          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${recipe.purine < 75 ? "bg-green-600" : recipe.purine < 150 ? "bg-amber-600" : "bg-red-600"}`}>
            {recipe.purine} mg purines
          </span>
          <span className="px-4 py-2 rounded-full text-sm bg-emerald-100 text-emerald-800 font-medium">
            {recipe.time} min
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((t: string) => (
            <span key={t} className="text-xs bg-coral/20 text-coral px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}