import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateImage() {
  const recipeId = process.argv[2];
  const imageUrl = process.argv[3];
  
  if (!recipeId || !imageUrl) {
    console.log('❌ Usage: npx tsx scripts/update_image.ts RG-0001 /images/recipes/my-image.jpg');
    console.log('\nExample:');
    console.log('  npx tsx scripts/update_image.ts RG-0231 /images/recipes/trail-mix.jpg');
    process.exit(1);
  }

  try {
    // First, verify the recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { recipeId },
      select: { recipeId: true, title: true, imageUrl: true },
    });

    if (!recipe) {
      console.log(`❌ Recipe ${recipeId} not found`);
      process.exit(1);
    }

    console.log(`\n📖 Updating: ${recipe.title}`);
    console.log(`   Old image: ${recipe.imageUrl || 'None'}`);
    console.log(`   New image: ${imageUrl}`);

    // Update the recipe
    await prisma.recipe.update({
      where: { recipeId },
      data: { imageUrl },
    });

    console.log(`✅ Successfully updated ${recipeId}!\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImage();
