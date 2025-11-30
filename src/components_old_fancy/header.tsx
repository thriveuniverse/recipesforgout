'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ChefHat, Heart, Calendar, BookOpen, LogOut, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export function Header() {
  const { data: session, status } = useSession() || {};
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      // Fetch user admin status
      fetch('/api/user/profile')
        .then((res) => res?.json())
        .then((data) => setIsAdmin(data?.user?.isAdmin ?? false))
        .catch(() => setIsAdmin(false));
    }
  }, [session]);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChefHat className="h-7 w-7 text-teal-600" />
            <span className="text-xl font-bold text-gray-900">RecipesForGout</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/recipes">
              <Button variant="ghost" className="text-gray-700 hover:text-teal-600">
                Browse Recipes
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="ghost" className="text-gray-700 hover:text-teal-600">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn About Gout
              </Button>
            </Link>
            {user && (
              <>
                <Link href="/favorites">
                  <Button variant="ghost" className="text-gray-700 hover:text-teal-600">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Button>
                </Link>
                <Link href="/meal-planner">
                  <Button variant="ghost" className="text-gray-700 hover:text-teal-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Meal Planner
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {status === 'loading' ? (
              <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="/profile">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user?.name || user?.email}</span>
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="cursor-pointer">
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/meal-planner" className="cursor-pointer">
                      <Calendar className="h-4 w-4 mr-2" />
                      Meal Planner
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
