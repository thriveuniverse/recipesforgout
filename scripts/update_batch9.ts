import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch9() {
  const updates = [
    { recipeId: 'RG-0141', imageUrl: '/images/recipes/baked-chicken-3.jpg' },
    { recipeId: 'RG-0142', imageUrl: '/images/recipes/vegetable-stir-fry-3.jpg' },
    { recipeId: 'RG-0143', imageUrl: '/images/recipes/pasta-tomato-3.jpg' },
    { recipeId: 'RG-0144', imageUrl: '/images/recipes/baked-fish-3.jpg' },
    { recipeId: 'RG-0145', imageUrl: '/images/recipes/vegetable-curry-3.jpg' },
    { recipeId: 'RG-0146', imageUrl: '/images/recipes/grilled-turkey-3.jpg' },
    { recipeId: 'RG-0147', imageUrl: '/images/recipes/risotto-3.jpg' },
    { recipeId: 'RG-0148', imageUrl: '/images/recipes/sweet-potato-3.jpg' },
    { recipeId: 'RG-0149', imageUrl: '/images/recipes/vegetable-casserole-3.jpg' },
    { recipeId: 'RG-0150', imageUrl: '/images/recipes/grilled-salmon-3.jpg' },
    { recipeId: 'RG-0151', imageUrl: '/images/recipes/baked-chicken-4.jpg' },
    { recipeId: 'RG-0152', imageUrl: '/images/recipes/vegetable-stir-fry-4.jpg' },
    { recipeId: 'RG-0153', imageUrl: '/images/recipes/pasta-tomato-4.jpg' },
    { recipeId: 'RG-0154', imageUrl: '/images/recipes/baked-fish-4.jpg' },
    { recipeId: 'RG-0155', imageUrl: '/images/recipes/vegetable-curry-4.jpg' },
  ];

  console.log('🔄 Updating Batch 9 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 9 updated successfully!');
  await prisma.$disconnect();
}

updateBatch9().catch(console.error);
