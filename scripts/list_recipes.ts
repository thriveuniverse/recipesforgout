import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function listRecipes() {
  const category = process.argv[2]?.toLowerCase();
  const filter = process.argv[3]?.toLowerCase();

  try {
    let recipes;
    
    if (category) {
      recipes = await prisma.recipe.findMany({
        where: {
          category: {
            equals: category.charAt(0).toUpperCase() + category.slice(1),
            mode: 'insensitive',
          },
        },
        select: {
          recipeId: true,
          title: true,
          category: true,
          imageUrl: true,
        },
        orderBy: { recipeId: 'asc' },
      });
    } else {
      recipes = await prisma.recipe.findMany({
        select: {
          recipeId: true,
          title: true,
          category: true,
          imageUrl: true,
        },
        orderBy: { recipeId: 'asc' },
      });
    }

    // Apply filter
    if (filter === 'no-image') {
      recipes = recipes.filter(r => !r.imageUrl);
    } else if (filter === 'has-image') {
      recipes = recipes.filter(r => r.imageUrl);
    }

    console.log('\n' + '='.repeat(80));
    if (category) {
      console.log(`📋 ${category.toUpperCase()} Recipes${filter ? ` (${filter})` : ''}`);
    } else {
      console.log(`📋 All Recipes${filter ? ` (${filter})` : ''}`);
    }
    console.log('='.repeat(80));
    console.log(`Total: ${recipes.length} recipes\n`);

    recipes.forEach((recipe) => {
      const hasImage = recipe.imageUrl ? '✅' : '❌';
      const categoryInfo = !category ? ` [${recipe.category}]` : '';
      console.log(`${hasImage} ${recipe.recipeId} - ${recipe.title}${categoryInfo}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('\nUsage:');
    console.log('  npx tsx scripts/list_recipes.ts                    # All recipes');
    console.log('  npx tsx scripts/list_recipes.ts snack              # Snack recipes only');
    console.log('  npx tsx scripts/list_recipes.ts snack no-image     # Snacks without images');
    console.log('  npx tsx scripts/list_recipes.ts dessert has-image  # Desserts with images');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listRecipes();
