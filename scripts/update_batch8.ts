import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch8() {
  const updates = [
    { recipeId: 'RG-0126', imageUrl: '/images/recipes/grilled-turkey-1.jpg' },
    { recipeId: 'RG-0127', imageUrl: '/images/recipes/risotto-1.jpg' },
    { recipeId: 'RG-0128', imageUrl: '/images/recipes/sweet-potato-1.jpg' },
    { recipeId: 'RG-0129', imageUrl: '/images/recipes/vegetable-casserole-1.jpg' },
    { recipeId: 'RG-0130', imageUrl: '/images/recipes/grilled-salmon-1.jpg' },
    { recipeId: 'RG-0131', imageUrl: '/images/recipes/baked-chicken-2.jpg' },
    { recipeId: 'RG-0132', imageUrl: '/images/recipes/vegetable-stir-fry-2.jpg' },
    { recipeId: 'RG-0133', imageUrl: '/images/recipes/pasta-tomato-2.jpg' },
    { recipeId: 'RG-0134', imageUrl: '/images/recipes/baked-fish-2.jpg' },
    { recipeId: 'RG-0135', imageUrl: '/images/recipes/vegetable-curry-2.jpg' },
    { recipeId: 'RG-0136', imageUrl: '/images/recipes/grilled-turkey-2.jpg' },
    { recipeId: 'RG-0137', imageUrl: '/images/recipes/risotto-2.jpg' },
    { recipeId: 'RG-0138', imageUrl: '/images/recipes/sweet-potato-2.jpg' },
    { recipeId: 'RG-0139', imageUrl: '/images/recipes/vegetable-casserole-2.jpg' },
    { recipeId: 'RG-0140', imageUrl: '/images/recipes/grilled-salmon-2.jpg' },
  ];

  console.log('🔄 Updating Batch 8 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 8 updated successfully!');
  await prisma.$disconnect();
}

updateBatch8().catch(console.error);
