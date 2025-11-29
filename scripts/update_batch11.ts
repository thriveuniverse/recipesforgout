import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateBatch11() {
  const updates = [
    { recipeId: 'RG-0201', imageUrl: '/images/recipes/apple-almond-butter-1.jpg' },
    { recipeId: 'RG-0202', imageUrl: '/images/recipes/veggie-hummus-1.jpg' },
    { recipeId: 'RG-0203', imageUrl: '/images/recipes/cheese-crackers-1.jpg' },
    { recipeId: 'RG-0204', imageUrl: '/images/recipes/mixed-nuts-1.jpg' },
    { recipeId: 'RG-0205', imageUrl: '/images/recipes/fruit-salad-2.jpg' },
    { recipeId: 'RG-0206', imageUrl: '/images/recipes/yogurt-berries-1.jpg' },
    { recipeId: 'RG-0207', imageUrl: '/images/recipes/crackers-cheese-1.jpg' },
    { recipeId: 'RG-0208', imageUrl: '/images/recipes/smoothie-2.jpg' },
    { recipeId: 'RG-0209', imageUrl: '/images/recipes/apple-almond-butter-2.jpg' },
    { recipeId: 'RG-0210', imageUrl: '/images/recipes/veggie-hummus-2.jpg' },
    { recipeId: 'RG-0211', imageUrl: '/images/recipes/cheese-crackers-2.jpg' },
    { recipeId: 'RG-0212', imageUrl: '/images/recipes/mixed-nuts-2.jpg' },
    { recipeId: 'RG-0213', imageUrl: '/images/recipes/fruit-salad-3.jpg' },
    { recipeId: 'RG-0214', imageUrl: '/images/recipes/yogurt-berries-2.jpg' },
    { recipeId: 'RG-0215', imageUrl: '/images/recipes/crackers-cheese-2.jpg' },
  ];

  console.log('🔄 Updating Batch 11 recipes...\n');
  
  for (const update of updates) {
    await prisma.recipe.update({
      where: { recipeId: update.recipeId },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.recipeId} -> ${update.imageUrl}`);
  }
  
  console.log('\n✨ Batch 11 updated successfully!');
  await prisma.$disconnect();
}

updateBatch11().catch(console.error);
