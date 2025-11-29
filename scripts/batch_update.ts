import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

// Edit this array with your updates
const updates: Array<{ recipeId: string; imageUrl: string }> = [
  // Example format:
  // { recipeId: 'RG-0231', imageUrl: '/images/recipes/trail-mix.jpg' },
  // { recipeId: 'RG-0232', imageUrl: '/images/recipes/rice-cakes.jpg' },
  // Add more lines as needed...
];

async function batchUpdate() {
  if (updates.length === 0) {
    console.log('\n⚠️  No updates defined!');
    console.log('\nEdit scripts/batch_update.ts and add your updates to the "updates" array.');
    console.log('\nExample:');
    console.log('const updates = [');
    console.log('  { recipeId: "RG-0231", imageUrl: "/images/recipes/trail-mix.jpg" },');
    console.log('  { recipeId: "RG-0232", imageUrl: "/images/recipes/rice-cakes.jpg" },');
    console.log('];\n');
    process.exit(0);
  }

  console.log(`\n📦 Batch updating ${updates.length} recipes...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { recipeId: update.recipeId },
        select: { title: true },
      });

      if (!recipe) {
        console.log(`❌ ${update.recipeId} - Recipe not found`);
        errorCount++;
        continue;
      }

      await prisma.recipe.update({
        where: { recipeId: update.recipeId },
        data: { imageUrl: update.imageUrl },
      });

      console.log(`✅ ${update.recipeId} - ${recipe.title}`);
      successCount++;

    } catch (error) {
      console.log(`❌ ${update.recipeId} - Error: ${error}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');

  await prisma.$disconnect();
}

batchUpdate();
