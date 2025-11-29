import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const totalRecipes = await prisma.recipe.count();
  
  const placeholderRecipes = await prisma.recipe.count({
    where: {
      instructions: {
        has: 'Step 1'
      }
    }
  });
  
  const updatedRecipes = totalRecipes - placeholderRecipes;
  
  console.log(`Total recipes: ${totalRecipes}`);
  console.log(`Updated with real instructions: ${updatedRecipes}`);
  console.log(`Still have placeholders: ${placeholderRecipes}`);
  console.log(`Progress: ${Math.round((updatedRecipes / totalRecipes) * 100)}%`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
