import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdminDashboard } from '@/components/admin-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.isAdmin) {
    redirect('/');
  }

  // Get contact submissions
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  // Get stats
  const stats = {
    totalRecipes: await prisma.recipe.count(),
    totalUsers: await prisma.user.count(),
    totalSubmissions: await prisma.contactSubmission.count(),
    newSubmissions: await prisma.contactSubmission.count({
      where: { status: 'new' },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <AdminDashboard submissions={submissions} stats={stats} />
      </main>
      <Footer />
    </div>
  );
}
