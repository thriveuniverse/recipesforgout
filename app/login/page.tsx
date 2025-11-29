'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, AlertCircle, ChefHat } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.replace('/recipes');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-2">
                <ChefHat className="h-8 w-8 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your recipes and meal plans</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value ?? '')}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e?.target?.value ?? '')}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600">
              Don\'t have an account?{' '}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
