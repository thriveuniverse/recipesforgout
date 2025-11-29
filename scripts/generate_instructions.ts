import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

interface RecipeIngredient {
  ingredient: {
    name: string;
  };
  amountG: number;
  notes?: string | null;
}

interface Recipe {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  servings: number;
  prepTimeMin: number;
  cookTimeMin: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
}

async function generateInstructions(recipe: Recipe): Promise<string[]> {
  const ingredientsList = recipe.ingredients
    .map(
      (item) =>
        `${item.amountG}g ${item.ingredient.name}${
          item.notes ? ` (${item.notes})` : ''
        }`
    )
    .join('\n');

  const prompt = `You are a professional chef writing cooking instructions for a gout-friendly recipe website.

Recipe Details:
Title: ${recipe.title}
Category: ${recipe.category}
Difficulty: ${recipe.difficulty}
Servings: ${recipe.servings}
Prep Time: ${recipe.prepTimeMin} minutes
Cook Time: ${recipe.cookTimeMin} minutes

Ingredients:
${ingredientsList}

Please write clear, detailed, step-by-step cooking instructions for this recipe. 

Requirements:
- Write 4-8 steps depending on complexity
- Each step should be a complete sentence
- Be specific about cooking techniques, temperatures, and timing
- Include practical tips where relevant
- Keep the language clear and easy to follow
- Focus on the actual cooking process
- Return ONLY the instructions as a JSON array of strings

Example format:
["Preheat the oven to 180°C (350°F) and line a baking sheet with parchment paper.", "In a large bowl, combine the oats, cinnamon, and salt. Mix well to distribute the spices evenly.", ...]

Return your response as a valid JSON array of instruction strings.`;

  try {
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in API response');
    }

    // Parse the JSON response
    const parsed = JSON.parse(content);
    
    // Handle different possible response formats
    let instructions: string[];
    if (Array.isArray(parsed)) {
      instructions = parsed;
    } else if (parsed.instructions && Array.isArray(parsed.instructions)) {
      instructions = parsed.instructions;
    } else if (parsed.steps && Array.isArray(parsed.steps)) {
      instructions = parsed.steps;
    } else {
      // If we can't find an array, try to extract values from the object
      instructions = Object.values(parsed).filter(
        (v) => typeof v === 'string'
      ) as string[];
    }

    // Validate we have instructions
    if (!instructions || instructions.length === 0) {
      throw new Error('No instructions found in API response');
    }

    return instructions;
  } catch (error) {
    console.error(`Error generating instructions for ${recipe.title}:`, error);
    // Return a basic fallback
    return [
      'Prepare all ingredients as listed.',
      'Follow standard cooking procedures for this type of dish.',
      'Cook until done and serve.',
    ];
  }
}

async function main() {
  console.log('Starting instruction generation for all recipes...');

  try {
    // Fetch all recipes with placeholder instructions
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
      orderBy: {
        recipeId: 'asc',
      },
    });

    console.log(`Found ${recipes.length} recipes to process`);

    let processed = 0;
    let updated = 0;
    let skipped = 0;

    for (const recipe of recipes) {
      processed++;
      
      // Check if this recipe already has real instructions (not just "Step N")
      const hasPlaceholder = recipe.instructions.every(
        (step) => /^Step \d+$/.test(step)
      );

      if (!hasPlaceholder) {
        console.log(
          `[${processed}/${recipes.length}] Skipping ${recipe.title} - already has real instructions`
        );
        skipped++;
        continue;
      }

      console.log(
        `[${processed}/${recipes.length}] Generating instructions for: ${recipe.title}`
      );

      const newInstructions = await generateInstructions(recipe);

      // Update the recipe in the database
      await prisma.recipe.update({
        where: { id: recipe.id },
        data: {
          instructions: newInstructions,
        },
      });

      updated++;
      console.log(
        `  ✓ Updated with ${newInstructions.length} instruction steps`
      );

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('\n=== Summary ===');
    console.log(`Total recipes processed: ${processed}`);
    console.log(`Recipes updated: ${updated}`);
    console.log(`Recipes skipped: ${skipped}`);
    console.log('\nInstruction generation complete!');
  } catch (error) {
    console.error('Error in main process:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });