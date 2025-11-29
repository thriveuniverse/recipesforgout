'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PurineBadge } from './purine-badge';
import {
  Heart,
  Clock,
  Users,
  ChefHat,
  Info,
  Share2,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Ingredient {
  id: string;
  ingredientId: string;
  amountG: number;
  notes?: string | null;
  purineMgPer100g: number;
  ingredient: {
    id: string;
    name: string;
    purineMgPer100g: number;
    category: string;
  };
}

interface RecipeData {
  id: string;
  recipeId: string;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  servings: number;
  prepTimeMin: number;
  cookTimeMin: number;
  totalTimeMin: number;
  instructions: string[];
  imageUrl?: string | null;
  caloriesKcal?: number | null;
  proteinG?: number | null;
  carbsG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  sugarG?: number | null;
  sodiumMg?: number | null;
  potassiumMg?: number | null;
  vitaminCMg?: number | null;
  purineMgPerServing: number;
  purineCategory: string;
  whyItWorks?: string | null;
  portionGuidance?: string | null;
  swapOptions: string[];
  triggerWarnings: string[];
  allergens: string[];
  dietTags: string[];
  ingredients: Ingredient[];
  isFavorited: boolean;
}

interface RecipeDetailClientProps {
  recipe: RecipeData;
  userId?: string;
}

export function RecipeDetailClient({ recipe, userId }: RecipeDetailClientProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(recipe?.isFavorited ?? false);
  const [loading, setLoading] = useState(false);

  const imageUrl =
    recipe?.imageUrl ||
    `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop`;

  const handleFavorite = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe?.id }),
      });

      if (response?.ok) {
        setIsFavorited(!isFavorited);
        router.refresh();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: recipe?.title ?? 'Recipe',
          text: `Check out this gout-friendly recipe: ${recipe?.title ?? ''}`,
          url: window?.location?.href ?? '',
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator?.clipboard?.writeText(window?.location?.href ?? '');
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <Image
          src={imageUrl}
          alt={recipe?.title ?? 'Recipe'}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white space-y-4"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {recipe?.category ?? 'Recipe'}
                </span>
                <PurineBadge
                  category={recipe?.purineCategory ?? 'low'}
                  value={recipe?.purineMgPerServing}
                  showIcon
                  showValue
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{recipe?.title ?? 'Recipe'}</h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Quick Info & Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="font-semibold">{recipe?.totalTimeMin ?? 0} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-semibold">{recipe?.servings ?? 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="font-semibold capitalize">{recipe?.difficulty ?? 'easy'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant={isFavorited ? 'default' : 'outline'}
                onClick={handleFavorite}
                disabled={loading}
                className={isFavorited ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-current' : ''}`}
                />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why It Works */}
            {recipe?.whyItWorks && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="font-semibold text-teal-900 mb-2">Why It Works for Gout</h2>
                    <p className="text-teal-800">{recipe?.whyItWorks}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <div className="space-y-3">
                {recipe?.ingredients?.map((item, index) => (
                  <div
                    key={item?.id ?? index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700 capitalize">
                      {item?.ingredient?.name ?? 'Unknown ingredient'}
                    </span>
                    <span className="text-gray-600 font-medium">{item?.amountG ?? 0}g</span>
                  </div>
                )) ?? <p className="text-gray-500">No ingredients listed</p>}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe?.instructions?.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step ?? ''}</p>
                  </li>
                )) ?? <p className="text-gray-500">No instructions provided</p>}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nutrition Facts */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
              <div className="text-sm text-gray-600">Per Serving</div>
              <div className="space-y-3 mt-4">
                {recipe?.caloriesKcal && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Calories</span>
                    <span className="font-semibold text-gray-900">
                      {recipe?.caloriesKcal} kcal
                    </span>
                  </div>
                )}
                {recipe?.proteinG && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Protein</span>
                    <span className="font-semibold text-gray-900">{recipe?.proteinG}g</span>
                  </div>
                )}
                {recipe?.carbsG && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Carbs</span>
                    <span className="font-semibold text-gray-900">{recipe?.carbsG}g</span>
                  </div>
                )}
                {recipe?.fatG && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Fat</span>
                    <span className="font-semibold text-gray-900">{recipe?.fatG}g</span>
                  </div>
                )}
                {recipe?.fiberG && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Fiber</span>
                    <span className="font-semibold text-gray-900">{recipe?.fiberG}g</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dietary Info */}
            {(recipe?.dietTags?.length ?? 0) > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Info</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe?.dietTags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium capitalize"
                    >
                      {tag ?? ''}
                    </span>
                  )) ?? null}
                </div>
              </div>
            )}

            {/* Allergens */}
            {(recipe?.allergens?.length ?? 0) > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">Allergen Information</h3>
                <div className="space-y-2">
                  {recipe?.allergens?.map((allergen, index) => (
                    <div key={index} className="text-amber-800 text-sm capitalize">
                      • Contains {allergen ?? ''}
                    </div>
                  )) ?? null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
