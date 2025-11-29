import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch6() {
  const updates = [
    { recipeId: 'RG-0086', imageUrl: '/images/recipes/pasta-primavera-3.jpg' },
    { recipeId: 'RG-0087', imageUrl: '/images/recipes/bean-salad-3.jpg' },
    { recipeId: 'RG-0088', imageUrl: '/images/recipes/rice-bowl-3.jpg' },
    { recipeId: 'RG-0089', imageUrl: '/images/recipes/vegetable-wrap-3.jpg' },
    { recipeId: 'RG-0090', imageUrl: '/images/recipes/tomato-soup-3.jpg' },
    { recipeId: 'RG-0091', imageUrl: '/images/recipes/mediterranean-salad-4.jpg' },
    { recipeId: 'RG-0092', imageUrl: '/images/recipes/vegetable-soup-4.jpg' },
    { recipeId: 'RG-0093', imageUrl: '/images/recipes/quinoa-bowl-4.jpg' },
    { recipeId: 'RG-0094', imageUrl: '/images/recipes/egg-salad-4.jpg' },
    { recipeId: 'RG-0095', imageUrl: '/images/recipes/lentil-salad-4.jpg' },
    { recipeId: 'RG-0096', imageUrl: '/images/recipes/pasta-primavera-4.jpg' },
    { recipeId: 'RG-0097', imageUrl: '/images/recipes/bean-salad-4.jpg' },
    { recipeId: 'RG-0098', imageUrl: '/images/recipes/rice-bowl-4.jpg' },
    { recipeId: 'RG-0099', imageUrl: '/images/recipes/vegetable-wrap-4.jpg' },
    { recipeId: 'RG-0100', imageUrl: '/images/recipes/tomato-soup-4.jpg' },
  ];

  console.log('🔄 Updating Batch 6 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 6 updated successfully!');
  await prisma.$disconnect();
}

updateBatch6().catch(console.error);
