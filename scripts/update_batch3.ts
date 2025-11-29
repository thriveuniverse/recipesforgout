import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch3() {
  const updates = [
    { recipeId: 'RG-0031', imageUrl: '/images/recipes/oatmeal-berries-4.jpg' },
    { recipeId: 'RG-0032', imageUrl: '/images/recipes/egg-scramble-4.jpg' },
    { recipeId: 'RG-0033', imageUrl: '/images/recipes/yogurt-parfait-4.jpg' },
    { recipeId: 'RG-0034', imageUrl: '/images/recipes/whole-grain-toast-4.jpg' },
    { recipeId: 'RG-0035', imageUrl: '/images/recipes/smoothie-bowl-4.jpg' },
    { recipeId: 'RG-0036', imageUrl: '/images/recipes/pancakes-4.jpg' },
    { recipeId: 'RG-0037', imageUrl: '/images/recipes/chia-pudding-4.jpg' },
    { recipeId: 'RG-0038', imageUrl: '/images/recipes/french-toast-8.jpg' },
    { recipeId: 'RG-0039', imageUrl: '/images/recipes/muesli-4.jpg' },
    { recipeId: 'RG-0040', imageUrl: '/images/recipes/cottage-cheese-4.jpg' },
    { recipeId: 'RG-0041', imageUrl: '/images/recipes/oatmeal-berries-5.jpg' },
    { recipeId: 'RG-0042', imageUrl: '/images/recipes/egg-scramble-5.jpg' },
    { recipeId: 'RG-0043', imageUrl: '/images/recipes/yogurt-parfait-5.jpg' },
    { recipeId: 'RG-0044', imageUrl: '/images/recipes/whole-grain-toast-5.jpg' },
    { recipeId: 'RG-0045', imageUrl: '/images/recipes/smoothie-bowl-5.jpg' },
  ];

  console.log('🔄 Updating Batch 3 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 3 updated successfully!');
  await prisma.$disconnect();
}

updateBatch3().catch(console.error);
