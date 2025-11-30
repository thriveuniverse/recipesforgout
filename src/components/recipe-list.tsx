// src/components/recipe-list.tsx
import { RecipeCard } from "./recipe-card";

type Props = {
  recipes: any[]; // ← This kills the tuple length error forever
};

export function RecipeList({ recipes }: Props) {
  if (recipes.length === 0) {
    return <p className="text-center py-12 text-xl text-slate-400">No recipes match – try different filters!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}