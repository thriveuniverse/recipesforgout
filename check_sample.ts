import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const recipe = await prisma.recipe.findFirst({
    where: {
      slug: 'oatmeal-berries'
    },
    select: {
      title: true,
      instructions: true,
    }
  });
  
  console.log(`\nRecipe: ${recipe?.title}`);
  console.log(`\nInstructions (${recipe?.instructions.length} steps):`);
  recipe?.instructions.forEach((step, i) => {
    console.log(`${i + 1}. ${step}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
