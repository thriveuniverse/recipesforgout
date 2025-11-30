'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MealPlan {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  recipes: {
    id: string;
    dayOfWeek?: number | null;
    mealType?: string | null;
    recipe: {
      id: string;
      title: string;
      slug: string;
      category: string;
      purineMgPerServing: number;
      purineCategory: string;
    };
  }[];
}

interface MealPlannerClientProps {
  mealPlans: MealPlan[];
  userId: string;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export function MealPlannerClient({ mealPlans }: MealPlannerClientProps) {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Meal Planner</h1>
              </div>
              <p className="text-purple-100 text-lg">Plan your gout-friendly meals for the week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {mealPlans?.length > 0 ? (
          <div className="space-y-8">
            {mealPlans.map((plan) => (
              <div key={plan?.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{plan?.name ?? 'Meal Plan'}</h2>
                  {plan?.description && (
                    <p className="text-gray-600 mt-1">{plan?.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Created {new Date(plan?.createdAt ?? Date.now()).toLocaleDateString()}
                  </p>
                </div>

                {/* Weekly Grid */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {DAYS.map((day, dayIndex) => {
                    const dayRecipes = plan?.recipes?.filter(
                      (r) => r?.dayOfWeek === dayIndex
                    ) ?? [];

                    return (
                      <div key={dayIndex} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 text-center">
                          {day}
                        </h3>
                        <div className="space-y-2">
                          {MEAL_TYPES.map((mealType) => {
                            const mealRecipe = dayRecipes.find(
                              (r) => r?.mealType?.toLowerCase() === mealType.toLowerCase()
                            );

                            return (
                              <div key={mealType} className="text-xs">
                                <div className="font-medium text-gray-600 mb-1">{mealType}</div>
                                {mealRecipe ? (
                                  <Link
                                    href={`/recipes/${mealRecipe?.recipe?.slug ?? ''}`}
                                    className="block bg-white rounded p-2 hover:bg-teal-50 transition-colors"
                                  >
                                    <p className="text-gray-900 line-clamp-2">
                                      {mealRecipe?.recipe?.title ?? 'Recipe'}
                                    </p>
                                  </Link>
                                ) : (
                                  <div className="bg-white rounded p-2 text-gray-400 text-center">
                                    -
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Meal Plans Yet</h2>
            <p className="text-gray-600 mb-6">
              Start planning your gout-friendly meals for the week. Browse our recipes and
              create your first meal plan.
            </p>
            <Link href="/recipes">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <ChefHat className="mr-2 h-5 w-5" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Coming Soon</h3>
          <p className="text-blue-800">
            We\'re working on advanced meal planning features including drag-and-drop recipe
            scheduling, automatic grocery lists, and purine tracking across your weekly
            meals. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
