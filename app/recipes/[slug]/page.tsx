import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RecipeDetailClient } from '@/components/recipe-detail-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getRecipe(slug: string, userId?: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        favorites: userId
          ? {
              where: { userId },
            }
          : false,
      },
    });

    if (!recipe) {
      return null;
    }

    return {
      ...recipe,
      isFavorited: userId ? (recipe?.favorites?.length ?? 0) > 0 : false,
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email
    ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id
    : undefined;

  const recipe = await getRecipe(params?.slug, userId);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <RecipeDetailClient recipe={recipe} userId={userId} />
      </main>
      <Footer />
    </div>
  );
}
