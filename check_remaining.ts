import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function getRemainingRecipes() {
  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [
        { imageUrl: { contains: 'unsplash.com' } },
        { imageUrl: { contains: '/images/categories/' } },
      ],
    },
    orderBy: { recipeId: 'asc' },
    select: {
      recipeId: true,
      title: true,
      category: true,
    },
  });

  console.log(`\n📋 Remaining ${recipes.length} recipes needing unique images\n`);
  
  const byCategory: Record<string, any[]> = {};
  recipes.forEach(recipe => {
    if (!byCategory[recipe.category]) byCategory[recipe.category] = [];
    byCategory[recipe.category].push(recipe);
  });
  
  Object.entries(byCategory).forEach(([category, items]) => {
    console.log(`${category}: ${items.length} recipes`);
  });
  
  console.log(`\nNext 30 recipes to process:`);
  recipes.slice(0, 30).forEach((r, i) => {
    console.log(`${i+1}. ${r.recipeId} - ${r.title} (${r.category})`);
  });
  
  await prisma.$disconnect();
}

getRemainingRecipes().catch(console.error);
