'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface RecipeSearchClientProps {
  initialSearch: string;
}

export function RecipeSearchClient({ initialSearch }: RecipeSearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => handleSearch(e?.target?.value ?? '')}
        className="pl-10 h-12 text-base bg-white"
      />
    </div>
  );
}
