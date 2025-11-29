import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch4() {
  const updates = [
    // Last 5 breakfast items
    { recipeId: 'RG-0046', imageUrl: '/images/recipes/pancakes-5.jpg' },
    { recipeId: 'RG-0047', imageUrl: '/images/recipes/chia-pudding-5.jpg' },
    { recipeId: 'RG-0048', imageUrl: '/images/recipes/french-toast-4.jpg' },
    { recipeId: 'RG-0049', imageUrl: '/images/recipes/muesli-5.jpg' },
    { recipeId: 'RG-0050', imageUrl: '/images/recipes/cottage-cheese-5.jpg' },
    // First 10 lunch items
    { recipeId: 'RG-0061', imageUrl: '/images/recipes/mediterranean-salad-1.jpg' },
    { recipeId: 'RG-0062', imageUrl: '/images/recipes/vegetable-soup-1.jpg' },
    { recipeId: 'RG-0063', imageUrl: '/images/recipes/quinoa-bowl-1.jpg' },
    { recipeId: 'RG-0064', imageUrl: '/images/recipes/egg-salad-1.jpg' },
    { recipeId: 'RG-0065', imageUrl: '/images/recipes/lentil-salad-1.jpg' },
    { recipeId: 'RG-0066', imageUrl: '/images/recipes/pasta-primavera-1.jpg' },
    { recipeId: 'RG-0067', imageUrl: '/images/recipes/bean-salad-1.jpg' },
    { recipeId: 'RG-0068', imageUrl: '/images/recipes/rice-bowl-1.jpg' },
    { recipeId: 'RG-0069', imageUrl: '/images/recipes/vegetable-wrap-1.jpg' },
    { recipeId: 'RG-0070', imageUrl: '/images/recipes/tomato-soup-1.jpg' },
  ];

  console.log('🔄 Updating Batch 4 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 4 updated successfully!');
  await prisma.$disconnect();
}

updateBatch4().catch(console.error);
