'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';
import { PurineBadge } from './purine-badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Recipe {
  id: string;
  recipeId: string;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  totalTimeMin: number;
  servings: number;
  purineMgPerServing: number;
  purineCategory: string;
  imageUrl?: string | null;
  caloriesKcal?: number | null;
}

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  // Fallback image for recipes without images
  const imageUrl =
    recipe?.imageUrl ||
    `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/recipes/${recipe?.slug || recipe?.recipeId}`}>
        <div className="group h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
          {/* Image */}
          <div className="relative aspect-video bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={recipe?.title || 'Recipe image'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-sm">
                {recipe?.category || 'Recipe'}
              </span>
            </div>
            {/* Purine Badge */}
            <div className="absolute top-3 right-3">
              <PurineBadge
                category={recipe?.purineCategory || 'low'}
                size="sm"
                showIcon={true}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
              {recipe?.title || 'Untitled Recipe'}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-800">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">{recipe?.totalTimeMin || 0} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">{recipe?.servings || 1} servings</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4 text-gray-600" />
                <span className="capitalize font-medium text-gray-800">{recipe?.difficulty || 'easy'}</span>
              </div>
            </div>

            {/* Nutrition */}
            {recipe?.caloriesKcal && (
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-800 font-medium">Calories</span>
                  <span className="font-semibold text-gray-900">
                    {recipe?.caloriesKcal} kcal
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
