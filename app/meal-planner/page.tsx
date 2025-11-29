import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MealPlannerClient } from '@/components/meal-planner-client';

export const dynamic = 'force-dynamic';

export default async function MealPlannerPage() {
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

  // Get user's meal plans
  const mealPlans = await prisma.mealPlan.findMany({
    where: { userId: user.id },
    include: {
      recipes: {
        include: {
          recipe: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <MealPlannerClient mealPlans={mealPlans} userId={user.id} />
      </main>
      <Footer />
    </div>
  );
}
