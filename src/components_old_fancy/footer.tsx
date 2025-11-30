import Link from 'next/link';
import { ChefHat, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-teal-600" />
              <span className="text-lg font-bold text-gray-900">RecipesForGout</span>
            </div>
            <p className="text-sm text-gray-600 text-center md:text-left">Delicious recipes for gout management</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/learn" className="text-gray-600 hover:text-teal-600 transition-colors">
              About Gout
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RecipesForGout.com. All rights reserved.</p>
          <p className="mt-1 text-xs">Consult a healthcare professional before making dietary changes.</p>
        </div>
      </div>
    </footer>
  );
}
