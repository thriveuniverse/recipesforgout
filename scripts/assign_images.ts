import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

interface ImageAssignment {
  recipeId: number;
  recipeName: string;
  imagePath: string;
}

// This script assigns images to recipes in batches
// Run with: npx tsx scripts/assign_images.ts <batch_number>

async function assignImages(batchNumber: number) {
  const batchSize = 15;
  const skip = (batchNumber - 1) * batchSize;

  console.log(`\n🎨 Processing Batch ${batchNumber}...`);
  console.log(`📊 Fetching recipes ${skip + 1} to ${skip + batchSize}...\n`);

  // Fetch recipes for this batch
  const recipes = await prisma.recipe.findMany({
    skip,
    take: batchSize,
    orderBy: { recipeId: 'asc' },
    select: {
      recipeId: true,
      title: true,
      imageUrl: true,
    },
  });

  if (recipes.length === 0) {
    console.log('✅ No more recipes to process!');
    return;
  }

  console.log(`Found ${recipes.length} recipes to process:\n`);
  recipes.forEach((recipe, index) => {
    console.log(`${skip + index + 1}. ${recipe.title}`);
  });

  console.log(`\n⏳ Waiting for images to be downloaded...`);
  console.log(`📁 Images should be placed in: /home/ubuntu/recipesforgout/nextjs_space/public/images/recipes/`);
  console.log(`\n💡 After downloading images, run the update command with the image mapping.`);

  return recipes;
}

async function updateRecipeImages(assignments: ImageAssignment[]) {
  console.log(`\n🔄 Updating ${assignments.length} recipes with new images...\n`);

  for (const assignment of assignments) {
    await prisma.recipe.update({
      where: { recipeId: assignment.recipeId.toString() },
      data: { imageUrl: assignment.imagePath },
    });
    console.log(`✅ Updated: ${assignment.recipeName} -> ${assignment.imagePath}`);
  }

  console.log(`\n✨ Successfully updated ${assignments.length} recipes!`);
}

async function getProgress() {
  const total = await prisma.recipe.count();
  const withGenericImages = await prisma.recipe.count({
    where: {
      OR: [
        { imageUrl: { contains: 'unsplash.com' } },
        { imageUrl: { contains: '/images/categories/' } },
      ],
    },
  });
  const withUniqueImages = total - withGenericImages;

  console.log(`\n📊 Image Assignment Progress:`);
  console.log(`   Total Recipes: ${total}`);
  console.log(`   ✅ Unique Images: ${withUniqueImages} (${Math.round((withUniqueImages / total) * 100)}%)`);
  console.log(`   ⏳ Generic Images: ${withGenericImages} (${Math.round((withGenericImages / total) * 100)}%)`);
  console.log(``);
}

const command = process.argv[2];
const arg = process.argv[3];

if (command === 'batch' && arg) {
  const batchNumber = parseInt(arg, 10);
  assignImages(batchNumber)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
} else if (command === 'progress') {
  getProgress()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
} else {
  console.log(`
📖 Usage:
`);
  console.log(`  Check progress:     npx tsx scripts/assign_images.ts progress`);
  console.log(`  Process batch:      npx tsx scripts/assign_images.ts batch <number>`);
  console.log(``);
  process.exit(1);
}
