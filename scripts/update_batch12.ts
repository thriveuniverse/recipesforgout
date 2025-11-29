import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();
async function updateBatch12() {
  const updates = [
    { recipeId: 'RG-0216', imageUrl: '/images/recipes/smoothie-3.jpg' },
    { recipeId: 'RG-0217', imageUrl: '/images/recipes/apple-almond-butter-3.jpg' },
    { recipeId: 'RG-0218', imageUrl: '/images/recipes/veggie-hummus-3.jpg' },
    { recipeId: 'RG-0219', imageUrl: '/images/recipes/cheese-crackers-3.jpg' },
    { recipeId: 'RG-0220', imageUrl: '/images/recipes/mixed-nuts-3.jpg' },
    { recipeId: 'RG-0221', imageUrl: '/images/recipes/fruit-salad-4.jpg' },
    { recipeId: 'RG-0222', imageUrl: '/images/recipes/yogurt-berries-3.jpg' },
    { recipeId: 'RG-0223', imageUrl: '/images/recipes/crackers-cheese-3.jpg' },
    { recipeId: 'RG-0224', imageUrl: '/images/recipes/smoothie-4.jpg' },
    { recipeId: 'RG-0225', imageUrl: '/images/recipes/apple-almond-butter-4.jpg' },
    { recipeId: 'RG-0226', imageUrl: '/images/recipes/veggie-hummus-4.jpg' },
    { recipeId: 'RG-0227', imageUrl: '/images/recipes/cheese-crackers-4.jpg' },
    { recipeId: 'RG-0228', imageUrl: '/images/recipes/mixed-nuts-4.jpg' },
    { recipeId: 'RG-0229', imageUrl: '/images/recipes/fruit-salad-5.jpg' },
    { recipeId: 'RG-0230', imageUrl: '/images/recipes/yogurt-berries-4.jpg' },
  ];
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
  }
  console.log('✨ Batch 12 updated!');
  await prisma.$disconnect();
}
updateBatch12().catch(console.error);
