import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RecipeCard } from '@/components/recipe-card';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getFavorites(userId: string) {
  try {
    const favorites = await prisma.userFavorite.findMany({
      where: { userId },
      include: {
        recipe: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return favorites.map((fav) => fav?.recipe).filter(Boolean);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  const favorites = await getFavorites(user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 fill-current" />
              <h1 className="text-4xl font-bold">My Favorites</h1>
            </div>
            <p className="text-red-100 text-lg">Your saved recipes for easy access</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {favorites?.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                {favorites?.length} saved recipe{favorites?.length !== 1 ? 's' : ''}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe, index) => (
                  <RecipeCard key={recipe?.id} recipe={recipe} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No favorites yet</p>
              <p className="text-gray-500">Start exploring recipes and save your favorites!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
