'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const PURINE_LEVELS = [
  { value: 'low', label: 'Low (<150mg)', color: 'text-emerald-600' },
  { value: 'moderate', label: 'Moderate (150-300mg)', color: 'text-amber-600' },
];

const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Dessert',
  'Drink',
];

const DIFFICULTIES = ['easy', 'medium', 'hard'];

const DIET_TAGS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
];

export function RecipeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedPurine, setSelectedPurine] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const purine = searchParams?.get('purine')?.split(',').filter(Boolean) || [];
    const categories = searchParams?.get('category')?.split(',').filter(Boolean) || [];
    const difficulties = searchParams?.get('difficulty')?.split(',').filter(Boolean) || [];
    const diets = searchParams?.get('diet')?.split(',').filter(Boolean) || [];
    
    setSelectedPurine(purine);
    setSelectedCategories(categories);
    setSelectedDifficulties(difficulties);
    setSelectedDiets(diets);
  }, [searchParams]);

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    // Clear old filters
    params.delete('purine');
    params.delete('category');
    params.delete('difficulty');
    params.delete('diet');
    
    // Add selected filters
    if (selectedPurine.length > 0) {
      params.set('purine', selectedPurine.join(','));
    }
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }
    if (selectedDifficulties.length > 0) {
      params.set('difficulty', selectedDifficulties.join(','));
    }
    if (selectedDiets.length > 0) {
      params.set('diet', selectedDiets.join(','));
    }
    
    router.push(`/recipes?${params.toString()}`);
  }, [selectedPurine, selectedCategories, selectedDifficulties, selectedDiets, router, searchParams]);

  const clearFilters = () => {
    setSelectedPurine([]);
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedDiets([]);
    router.push('/recipes');
  };

  const hasFilters =
    selectedPurine.length > 0 ||
    selectedCategories.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedDiets.length > 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-6 sticky top-20">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Purine Level */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Purine Level</h3>
        <div className="space-y-2">
          {PURINE_LEVELS.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`purine-${level.value}`}
                checked={selectedPurine.includes(level.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedPurine([...selectedPurine, level.value]);
                  } else {
                    setSelectedPurine(selectedPurine.filter((p) => p !== level.value));
                  }
                }}
              />
              <Label
                htmlFor={`purine-${level.value}`}
                className={`text-sm cursor-pointer ${level.color}`}
              >
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Meal Type</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Difficulty */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Difficulty</h3>
        <div className="space-y-2">
          {DIFFICULTIES.map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={selectedDifficulties.includes(difficulty)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDifficulties([...selectedDifficulties, difficulty]);
                  } else {
                    setSelectedDifficulties(
                      selectedDifficulties.filter((d) => d !== difficulty)
                    );
                  }
                }}
              />
              <Label
                htmlFor={`difficulty-${difficulty}`}
                className="text-sm cursor-pointer capitalize"
              >
                {difficulty}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Diet Tags */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Dietary Preferences</h3>
        <div className="space-y-2">
          {DIET_TAGS.map((diet) => (
            <div key={diet.value} className="flex items-center space-x-2">
              <Checkbox
                id={`diet-${diet.value}`}
                checked={selectedDiets.includes(diet.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDiets([...selectedDiets, diet.value]);
                  } else {
                    setSelectedDiets(selectedDiets.filter((d) => d !== diet.value));
                  }
                }}
              />
              <Label htmlFor={`diet-${diet.value}`} className="text-sm cursor-pointer">
                {diet.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={updateFilters}
        className="w-full bg-teal-600 hover:bg-teal-700"
      >
        Apply Filters
      </Button>
    </div>
  );
}
