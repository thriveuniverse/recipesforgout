import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch1() {
  const updates = [
    { recipeId: 'RG-0001', imageUrl: '/images/recipes/oatmeal-berries-1.jpg' },
    { recipeId: 'RG-0002', imageUrl: '/images/recipes/egg-scramble-1.jpg' },
    { recipeId: 'RG-0003', imageUrl: '/images/recipes/yogurt-parfait-1.jpg' },
    { recipeId: 'RG-0004', imageUrl: '/images/recipes/whole-grain-toast-1.jpg' },
    { recipeId: 'RG-0005', imageUrl: '/images/recipes/smoothie-bowl-1.jpg' },
    { recipeId: 'RG-0006', imageUrl: '/images/recipes/pancakes-1.jpg' },
    { recipeId: 'RG-0007', imageUrl: '/images/recipes/chia-pudding-1.jpg' },
    { recipeId: 'RG-0008', imageUrl: '/images/recipes/french-toast-1.jpg' },
    { recipeId: 'RG-0009', imageUrl: '/images/recipes/muesli-1.jpg' },
    { recipeId: 'RG-0010', imageUrl: '/images/recipes/cottage-cheese-1.jpg' },
    { recipeId: 'RG-0011', imageUrl: '/images/recipes/oatmeal-berries-2.jpg' },
    { recipeId: 'RG-0012', imageUrl: '/images/recipes/egg-scramble-2.jpg' },
    { recipeId: 'RG-0013', imageUrl: '/images/recipes/yogurt-parfait-2.jpg' },
    { recipeId: 'RG-0014', imageUrl: '/images/recipes/whole-grain-toast-2.jpg' },
    { recipeId: 'RG-0015', imageUrl: '/images/recipes/smoothie-bowl-2.jpg' },
  ];

  console.log('🔄 Updating Batch 1 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 1 updated successfully!');
  await prisma.$disconnect();
}

updateBatch1().catch(console.error);
