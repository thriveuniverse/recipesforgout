import { prisma } from '@/lib/db';
import { RecipeCard } from './recipe-card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { RecipeSearchClient } from './recipe-search-client';

export const dynamic = 'force-dynamic';

interface RecipeListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getRecipes(params: { [key: string]: string | string[] | undefined }) {
  const search = params?.search as string | undefined;
  const purineParam = params?.purine as string | undefined;
  const categoryParam = params?.category as string | undefined;
  const difficultyParam = params?.difficulty as string | undefined;
  const dietParam = params?.diet as string | undefined;

  const purineCategories = purineParam?.split(',').filter(Boolean) || [];
  const categories = categoryParam?.split(',').filter(Boolean) || [];
  const difficulties = difficultyParam?.split(',').filter(Boolean) || [];
  const dietTags = dietParam?.split(',').filter(Boolean) || [];

  try {
    const where: any = {};

    // Search in title
    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Filter by purine category
    if (purineCategories.length > 0) {
      where.purineCategory = {
        in: purineCategories,
      };
    }

    // Filter by meal category
    if (categories.length > 0) {
      where.category = {
        in: categories,
      };
    }

    // Filter by difficulty
    if (difficulties.length > 0) {
      where.difficulty = {
        in: difficulties,
      };
    }

    // Filter by diet tags
    if (dietTags.length > 0) {
      where.AND = dietTags.map((tag) => ({
        dietTags: {
          has: tag,
        },
      }));
    }

    const recipes = await prisma.recipe.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function RecipeList({ searchParams }: RecipeListProps) {
  const recipes = await getRecipes(searchParams);
  const searchQuery = (searchParams?.search as string) || '';

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <RecipeSearchClient initialSearch={searchQuery} />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {recipes?.length || 0} recipe{recipes?.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Recipe Grid */}
      {recipes?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe?.id} recipe={recipe} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">No recipes found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
