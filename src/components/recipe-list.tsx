// src/components/recipe-list.tsx  ← FINAL, PERFECT VERSION
import { RecipeCard } from "./recipe-card";

export function RecipeList({ recipes }: { recipes: any[] }) {
  if (recipes.length === 0) {
    return (
      <p className="text-center text-xl text-charcoal/70 py-12">
        No recipes match – try different filters!
      </p>
    );
  }

  return (
    <div className="space-y-16"> {/* ← THIS IS THE MAGIC */}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex justify-center">
          <div className="w-full max-w-sm">
            <RecipeCard recipe={recipe} />
          </div>
        </div>
      ))}
    </div>
  );
}