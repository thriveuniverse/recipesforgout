import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch2() {
  const updates = [
    { recipeId: 'RG-0016', imageUrl: '/images/recipes/pancakes-2.jpg' },
    { recipeId: 'RG-0017', imageUrl: '/images/recipes/chia-pudding-2.jpg' },
    { recipeId: 'RG-0018', imageUrl: '/images/recipes/french-toast-2.jpg' },
    { recipeId: 'RG-0019', imageUrl: '/images/recipes/muesli-2.jpg' },
    { recipeId: 'RG-0020', imageUrl: '/images/recipes/cottage-cheese-2.jpg' },
    { recipeId: 'RG-0021', imageUrl: '/images/recipes/oatmeal-berries-3.jpg' },
    { recipeId: 'RG-0022', imageUrl: '/images/recipes/egg-scramble-3.jpg' },
    { recipeId: 'RG-0023', imageUrl: '/images/recipes/yogurt-parfait-3.jpg' },
    { recipeId: 'RG-0024', imageUrl: '/images/recipes/whole-grain-toast-3.jpg' },
    { recipeId: 'RG-0025', imageUrl: '/images/recipes/smoothie-bowl-3.jpg' },
    { recipeId: 'RG-0026', imageUrl: '/images/recipes/pancakes-3.jpg' },
    { recipeId: 'RG-0027', imageUrl: '/images/recipes/chia-pudding-3.jpg' },
    { recipeId: 'RG-0028', imageUrl: '/images/recipes/french-toast-3.jpg' },
    { recipeId: 'RG-0029', imageUrl: '/images/recipes/muesli-3.jpg' },
    { recipeId: 'RG-0030', imageUrl: '/images/recipes/cottage-cheese-3.jpg' },
  ];

  console.log('🔄 Updating Batch 2 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 2 updated successfully!');
  await prisma.$disconnect();
}

updateBatch2().catch(console.error);
