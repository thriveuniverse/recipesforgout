import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch5() {
  const updates = [
    { recipeId: 'RG-0071', imageUrl: '/images/recipes/mediterranean-salad-2.jpg' },
    { recipeId: 'RG-0072', imageUrl: '/images/recipes/vegetable-soup-2.jpg' },
    { recipeId: 'RG-0073', imageUrl: '/images/recipes/quinoa-bowl-2.jpg' },
    { recipeId: 'RG-0074', imageUrl: '/images/recipes/egg-salad-2.jpg' },
    { recipeId: 'RG-0075', imageUrl: '/images/recipes/lentil-salad-2.jpg' },
    { recipeId: 'RG-0076', imageUrl: '/images/recipes/pasta-primavera-2.jpg' },
    { recipeId: 'RG-0077', imageUrl: '/images/recipes/bean-salad-2.jpg' },
    { recipeId: 'RG-0078', imageUrl: '/images/recipes/rice-bowl-2.jpg' },
    { recipeId: 'RG-0079', imageUrl: '/images/recipes/vegetable-wrap-2.jpg' },
    { recipeId: 'RG-0080', imageUrl: '/images/recipes/tomato-soup-2.jpg' },
    { recipeId: 'RG-0081', imageUrl: '/images/recipes/mediterranean-salad-3.jpg' },
    { recipeId: 'RG-0082', imageUrl: '/images/recipes/vegetable-soup-3.jpg' },
    { recipeId: 'RG-0083', imageUrl: '/images/recipes/quinoa-bowl-3.jpg' },
    { recipeId: 'RG-0084', imageUrl: '/images/recipes/egg-salad-3.jpg' },
    { recipeId: 'RG-0085', imageUrl: '/images/recipes/lentil-salad-3.jpg' },
  ];

  console.log('🔄 Updating Batch 5 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 5 updated successfully!');
  await prisma.$disconnect();
}

updateBatch5().catch(console.error);
