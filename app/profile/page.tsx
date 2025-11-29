import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { User, Mail, Calendar, Heart, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      _count: {
        select: {
          favorites: true,
          mealPlans: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{user?.name || 'User'}</h1>
                <p className="text-teal-100 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Account Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user?._count?.favorites ?? 0}</p>
                  <p className="text-sm text-gray-600">Favorites</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user?._count?.mealPlans ?? 0}</p>
                  <p className="text-sm text-gray-600">Meal Plans</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Member Since</p>
                  <p className="text-sm text-gray-600">
                    {new Date(user?.createdAt ?? Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-6 bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{user?.name || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4 border-b">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(user?.createdAt ?? Date.now()).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
