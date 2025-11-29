import { Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RecipeList } from '@/components/recipe-list';
import { RecipeFilters } from '@/components/recipe-filters';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-bold mb-2">Browse Recipes</h1>
            <p className="text-teal-100 text-lg">Discover delicious, gout-friendly recipes designed for your health</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-96 bg-white rounded-lg animate-pulse" />}>
                <RecipeFilters />
              </Suspense>
            </div>

            {/* Recipe List */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                  </div>
                }
              >
                <RecipeList searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
