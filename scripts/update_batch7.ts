import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch7() {
  const updates = [
    // Last 10 lunch items
    { recipeId: 'RG-0101', imageUrl: '/images/recipes/mediterranean-salad-5.jpg' },
    { recipeId: 'RG-0102', imageUrl: '/images/recipes/vegetable-soup-5.jpg' },
    { recipeId: 'RG-0103', imageUrl: '/images/recipes/quinoa-bowl-5.jpg' },
    { recipeId: 'RG-0104', imageUrl: '/images/recipes/egg-salad-5.jpg' },
    { recipeId: 'RG-0105', imageUrl: '/images/recipes/lentil-salad-5.jpg' },
    { recipeId: 'RG-0106', imageUrl: '/images/recipes/pasta-primavera-5.jpg' },
    { recipeId: 'RG-0107', imageUrl: '/images/recipes/bean-salad-5.jpg' },
    { recipeId: 'RG-0108', imageUrl: '/images/recipes/rice-bowl-5.jpg' },
    { recipeId: 'RG-0109', imageUrl: '/images/recipes/vegetable-wrap-5.jpg' },
    { recipeId: 'RG-0110', imageUrl: '/images/recipes/tomato-soup-5.jpg' },
    // First 5 dinner items
    { recipeId: 'RG-0121', imageUrl: '/images/recipes/baked-chicken-1.jpg' },
    { recipeId: 'RG-0122', imageUrl: '/images/recipes/vegetable-stir-fry-1.jpg' },
    { recipeId: 'RG-0123', imageUrl: '/images/recipes/pasta-tomato-1.jpg' },
    { recipeId: 'RG-0124', imageUrl: '/images/recipes/baked-fish-1.jpg' },
    { recipeId: 'RG-0125', imageUrl: '/images/recipes/vegetable-curry-1.jpg' },
  ];

  console.log('🔄 Updating Batch 7 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 7 updated successfully!');
  await prisma.$disconnect();
}

updateBatch7().catch(console.error);
