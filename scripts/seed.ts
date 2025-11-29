import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const UPLOADS_DIR = '/home/ubuntu/Uploads';

interface IngredientData {
  ingredient: string;
  purine_mg_per_100g: string;
  category: string;
  default_confidence: string;
  notes: string;
}

interface RecipeIngredientData {
  name: string;
  amount_g: number;
  purine_mg_per_100g: number;
  purine_source_note?: string;
  nutrition_source_note?: string;
}

interface RecipeData {
  id: string;
  slug: string;
  title: string;
  category: string;
  diet_tags: string[];
  servings: number;
  prep_time_min: number;
  cook_time_min: number;
  total_time_min: number;
  difficulty: string;
  ingredients: RecipeIngredientData[];
  instructions: string[];
  nutrition_per_serving: {
    calories_kcal: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
    added_sugar_g: number;
    sodium_mg: number;
    potassium_mg: number;
    vitamin_c_mg: number;
  };
  gout_notes: {
    why_it_works: string;
    portion_guidance: string;
    swap_options: string[];
    trigger_warnings: string[];
  };
  allergens: string[];
  image_prompt: string;
  purines: {
    purine_mg_per_serving: number;
    purine_category: string;
    confidence: string;
    calculation_note: string;
  };
  gout_trigger_flags: string[];
}

async function parseCSV(filePath: string): Promise<IngredientData[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  const data: IngredientData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length >= 5) {
      data.push({
        ingredient: values[0]?.trim() || '',
        purine_mg_per_100g: values[1]?.trim() || '0',
        category: values[2]?.trim() || 'low',
        default_confidence: values[3]?.trim() || 'medium',
        notes: values[4]?.trim() || '',
      });
    }
  }

  return data;
}

async function seedIngredients() {
  console.log('🌱 Seeding ingredients...');
  const csvPath = path.join(UPLOADS_DIR, 'ingredient_purines_v1.csv');
  const ingredientData = await parseCSV(csvPath);

  for (const item of ingredientData) {
    try {
      await prisma.ingredient.upsert({
        where: { name: item.ingredient },
        update: {
          purineMgPer100g: parseFloat(item.purine_mg_per_100g) || 0,
          category: item.category,
          defaultConfidence: item.default_confidence,
          notes: item.notes,
        },
        create: {
          name: item.ingredient,
          purineMgPer100g: parseFloat(item.purine_mg_per_100g) || 0,
          category: item.category,
          defaultConfidence: item.default_confidence,
          notes: item.notes,
        },
      });
    } catch (error) {
      console.error(`Error seeding ingredient ${item.ingredient}:`, error);
    }
  }

  console.log(`✅ Seeded ${ingredientData.length} ingredients`);
}

async function seedRecipes() {
  console.log('🌱 Seeding recipes...');
  
  // Read both recipe files
  const part1Path = path.join(UPLOADS_DIR, 'recipes_v1_part1.json');
  const part2Path = path.join(UPLOADS_DIR, 'recipes_v1_part2.json');
  
  const part1Data: RecipeData[] = JSON.parse(fs.readFileSync(part1Path, 'utf-8'));
  const part2Data: RecipeData[] = JSON.parse(fs.readFileSync(part2Path, 'utf-8'));
  
  const allRecipes = [...part1Data, ...part2Data];
  
  console.log(`Found ${allRecipes.length} recipes to seed`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const recipeData of allRecipes) {
    try {
      // Check if slug already exists for a different recipe
      const existingRecipe = await prisma.recipe.findUnique({
        where: { slug: recipeData.slug },
      });
      
      // If slug exists and belongs to a different recipe, modify it
      let finalSlug = recipeData.slug;
      if (existingRecipe && existingRecipe.recipeId !== recipeData.id) {
        finalSlug = `${recipeData.slug}-${recipeData.id.toLowerCase()}`;
      }
      
      // Create or update recipe
      const recipe = await prisma.recipe.upsert({
        where: { recipeId: recipeData.id },
        update: {
          slug: finalSlug,
          title: recipeData.title,
          category: recipeData.category,
          dietTags: recipeData.diet_tags || [],
          servings: recipeData.servings,
          prepTimeMin: recipeData.prep_time_min,
          cookTimeMin: recipeData.cook_time_min,
          totalTimeMin: recipeData.total_time_min,
          difficulty: recipeData.difficulty,
          instructions: recipeData.instructions || [],
          imagePrompt: recipeData.image_prompt,
          caloriesKcal: recipeData.nutrition_per_serving?.calories_kcal,
          proteinG: recipeData.nutrition_per_serving?.protein_g,
          carbsG: recipeData.nutrition_per_serving?.carbs_g,
          fatG: recipeData.nutrition_per_serving?.fat_g,
          fiberG: recipeData.nutrition_per_serving?.fiber_g,
          sugarG: recipeData.nutrition_per_serving?.sugar_g,
          addedSugarG: recipeData.nutrition_per_serving?.added_sugar_g,
          sodiumMg: recipeData.nutrition_per_serving?.sodium_mg,
          potassiumMg: recipeData.nutrition_per_serving?.potassium_mg,
          vitaminCMg: recipeData.nutrition_per_serving?.vitamin_c_mg,
          purineMgPerServing: recipeData.purines?.purine_mg_per_serving || 0,
          purineCategory: recipeData.purines?.purine_category || 'low',
          purineConfidence: recipeData.purines?.confidence || 'medium',
          purineCalculationNote: recipeData.purines?.calculation_note,
          whyItWorks: recipeData.gout_notes?.why_it_works,
          portionGuidance: recipeData.gout_notes?.portion_guidance,
          swapOptions: recipeData.gout_notes?.swap_options || [],
          triggerWarnings: recipeData.gout_notes?.trigger_warnings || [],
          allergens: recipeData.allergens || [],
          goutTriggerFlags: recipeData.gout_trigger_flags || [],
        },
        create: {
          recipeId: recipeData.id,
          slug: finalSlug,
          title: recipeData.title,
          category: recipeData.category,
          dietTags: recipeData.diet_tags || [],
          servings: recipeData.servings,
          prepTimeMin: recipeData.prep_time_min,
          cookTimeMin: recipeData.cook_time_min,
          totalTimeMin: recipeData.total_time_min,
          difficulty: recipeData.difficulty,
          instructions: recipeData.instructions || [],
          imagePrompt: recipeData.image_prompt,
          caloriesKcal: recipeData.nutrition_per_serving?.calories_kcal,
          proteinG: recipeData.nutrition_per_serving?.protein_g,
          carbsG: recipeData.nutrition_per_serving?.carbs_g,
          fatG: recipeData.nutrition_per_serving?.fat_g,
          fiberG: recipeData.nutrition_per_serving?.fiber_g,
          sugarG: recipeData.nutrition_per_serving?.sugar_g,
          addedSugarG: recipeData.nutrition_per_serving?.added_sugar_g,
          sodiumMg: recipeData.nutrition_per_serving?.sodium_mg,
          potassiumMg: recipeData.nutrition_per_serving?.potassium_mg,
          vitaminCMg: recipeData.nutrition_per_serving?.vitamin_c_mg,
          purineMgPerServing: recipeData.purines?.purine_mg_per_serving || 0,
          purineCategory: recipeData.purines?.purine_category || 'low',
          purineConfidence: recipeData.purines?.confidence || 'medium',
          purineCalculationNote: recipeData.purines?.calculation_note,
          whyItWorks: recipeData.gout_notes?.why_it_works,
          portionGuidance: recipeData.gout_notes?.portion_guidance,
          swapOptions: recipeData.gout_notes?.swap_options || [],
          triggerWarnings: recipeData.gout_notes?.trigger_warnings || [],
          allergens: recipeData.allergens || [],
          goutTriggerFlags: recipeData.gout_trigger_flags || [],
        },
      });

      // Create recipe ingredients
      if (recipeData.ingredients && Array.isArray(recipeData.ingredients)) {
        for (const ingredientData of recipeData.ingredients) {
          try {
            // Find or create ingredient
            let ingredient = await prisma.ingredient.findUnique({
              where: { name: ingredientData.name },
            });

            if (!ingredient) {
              // Create ingredient if it doesn't exist
              ingredient = await prisma.ingredient.create({
                data: {
                  name: ingredientData.name,
                  purineMgPer100g: ingredientData.purine_mg_per_100g || 0,
                  category: ingredientData.purine_mg_per_100g < 100 ? 'low' : 'moderate',
                  defaultConfidence: 'medium',
                  notes: 'Auto-generated from recipe',
                },
              });
            }

            // Create or update recipe ingredient
            await prisma.recipeIngredient.upsert({
              where: {
                recipeId_ingredientId: {
                  recipeId: recipe.id,
                  ingredientId: ingredient.id,
                },
              },
              update: {
                amountG: ingredientData.amount_g,
                purineMgPer100g: ingredientData.purine_mg_per_100g || 0,
                purineSourceNote: ingredientData.purine_source_note,
                nutritionSourceNote: ingredientData.nutrition_source_note,
              },
              create: {
                recipeId: recipe.id,
                ingredientId: ingredient.id,
                amountG: ingredientData.amount_g,
                purineMgPer100g: ingredientData.purine_mg_per_100g || 0,
                purineSourceNote: ingredientData.purine_source_note,
                nutritionSourceNote: ingredientData.nutrition_source_note,
              },
            });
          } catch (error) {
            console.error(`Error adding ingredient ${ingredientData.name} to recipe ${recipeData.id}:`, error);
          }
        }
      }

      successCount++;
      if (successCount % 50 === 0) {
        console.log(`  Processed ${successCount} recipes...`);
      }
    } catch (error) {
      console.error(`Error seeding recipe ${recipeData.id}:`, error);
      errorCount++;
    }
  }

  console.log(`✅ Seeded ${successCount} recipes successfully (${errorCount} errors)`);
}

async function seedUsers() {
  console.log('🌱 Seeding users...');
  
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  
  // Create admin test user
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {
      name: 'John Doe',
      password: hashedPassword,
      isAdmin: true,
    },
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
      isAdmin: true,
    },
  });
  
  console.log('✅ Seeded test admin user');
}

async function main() {
  console.log('🚀 Starting database seed...');
  
  try {
    await seedUsers();
    await seedIngredients();
    await seedRecipes();
    
    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });