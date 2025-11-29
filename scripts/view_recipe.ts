import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function viewRecipe() {
  const recipeId = process.argv[2];
  
  if (!recipeId) {
    console.log('❌ Usage: npx tsx scripts/view_recipe.ts RG-0001');
    process.exit(1);
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { recipeId },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!recipe) {
      console.log(`❌ Recipe ${recipeId} not found`);
      process.exit(1);
    }

    console.log('\n' + '='.repeat(80));
    console.log(`📖 ${recipe.title}`);
    console.log('='.repeat(80));
    console.log(`Recipe ID: ${recipe.recipeId}`);
    console.log(`Category: ${recipe.category}`);
    console.log(`Difficulty: ${recipe.difficulty}`);
    console.log(`Prep Time: ${recipe.prepTimeMin} min | Cook Time: ${recipe.cookTimeMin} min`);
    console.log(`Servings: ${recipe.servings}`);
    console.log(`\n🥗 Ingredients:`);
    recipe.ingredients.forEach((ri) => {
      console.log(`  - ${ri.amountG}g ${ri.ingredient.name}`);
    });
    console.log(`\n👨‍🍳 Instructions:`);
    recipe.instructions.forEach((instruction, index) => {
      console.log(`  ${index + 1}. ${instruction}`);
    });
    console.log(`\n🖼️  Current Image:`);
    console.log(`  ${recipe.imageUrl || 'No image set'}`);
    console.log('\n' + '='.repeat(80) + '\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

viewRecipe();
