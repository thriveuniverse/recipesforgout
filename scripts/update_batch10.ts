import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch10() {
  const updates = [
    // First 5 dinner recipes
    { recipeId: 'RG-0156', imageUrl: '/images/recipes/grilled-turkey-4.jpg' },
    { recipeId: 'RG-0157', imageUrl: '/images/recipes/risotto-4.jpg' },
    { recipeId: 'RG-0158', imageUrl: '/images/recipes/sweet-potato-4.jpg' },
    { recipeId: 'RG-0159', imageUrl: '/images/recipes/vegetable-casserole-4.jpg' },
    { recipeId: 'RG-0160', imageUrl: '/images/recipes/grilled-salmon-4.jpg' },
    // Next 10 dinner recipes
    { recipeId: 'RG-0161', imageUrl: '/images/recipes/baked-chicken-5.jpg' },
    { recipeId: 'RG-0162', imageUrl: '/images/recipes/vegetable-stir-fry-5.jpg' },
    { recipeId: 'RG-0163', imageUrl: '/images/recipes/pasta-tomato-5.jpg' },
    { recipeId: 'RG-0164', imageUrl: '/images/recipes/baked-fish-5.jpg' },
    { recipeId: 'RG-0165', imageUrl: '/images/recipes/vegetable-curry-5.jpg' },
    { recipeId: 'RG-0166', imageUrl: '/images/recipes/grilled-turkey-5.jpg' },
    { recipeId: 'RG-0167', imageUrl: '/images/recipes/risotto-5.jpg' },
    { recipeId: 'RG-0168', imageUrl: '/images/recipes/sweet-potato-5.jpg' },
    { recipeId: 'RG-0169', imageUrl: '/images/recipes/vegetable-casserole-5.jpg' },
    { recipeId: 'RG-0170', imageUrl: '/images/recipes/grilled-salmon-5.jpg' },
  ];

  console.log('🔄 Updating Batch 10 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 10 updated successfully!');
  await prisma.$disconnect();
}

updateBatch10().catch(console.error);
