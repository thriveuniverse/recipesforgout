import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const recipe = await prisma.recipe.findFirst({
    select: {
      title: true,
      instructions: true,
    }
  });
  console.log('Recipe:', recipe?.title);
  console.log('Instructions:', JSON.stringify(recipe?.instructions, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
