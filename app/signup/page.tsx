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
import { Mail, Lock, User, AlertCircle, ChefHat, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create account
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Auto sign in after successful signup
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but failed to sign in. Please try logging in.');
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
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600">Start your gout-friendly journey today</p>
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
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e?.target?.value ?? '')}
                    className="pl-10"
                  />
                </div>
              </div>

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
                    minLength={6}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">Minimum 6 characters</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            {/* Benefits */}
            <div className="pt-4 space-y-2 border-t">
              <p className="text-sm font-medium text-gray-700">What you\'ll get:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span>Save your favorite recipes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span>Create personalized meal plans</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <span>Track your gout-friendly diet</span>
                </div>
              </div>
            </div>

            {/* Sign in link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
