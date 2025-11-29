import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [
        { slug: { contains: 'pear' } },
        { title: { contains: 'Pear' } }
      ]
    },
    select: { id: true, recipeId: true, slug: true, title: true }
  });
  console.log('Found recipes:', recipes);
}

main().catch(console.error).finally(() => prisma.$disconnect());
