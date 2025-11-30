// src/components/recipe-list.tsx   ← overwrite entirely
import { RecipeCard } from "./recipe-card";

export function RecipeList({ recipes }: { recipes: typeof import("@/data/recipes").recipes }) {
  if (recipes.length === 0) {
    return <p className="text-center py-12 text-xl text-slate-400">No recipes match your filters – try different options!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}