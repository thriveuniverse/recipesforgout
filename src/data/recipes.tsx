// src/data/recipes.ts
export const recipes = [
  {
    id: 1,
    title: "Reverse-Seared Ribeye with Garlic Butter",
    purine: 89,
    time: 35,
    tags: ["steak"] as const,
    energy: "high" as const,
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta",
    purine: 67,
    time: 18,
    tags: ["pasta"] as const,
    energy: "low" as const,
  },
  {
    id: 3,
    title: "Cherry Bomb Chocolate Mousse",
    purine: 23,
    time: 10,
    tags: ["sweet"] as const,
    energy: "low" as const,
  },
  {
    id: 4,
    title: "Thai Green Curry (Low-Purine)",
    purine: 112,
    time: 30,
    tags: ["curry"] as const,
    energy: "high" as const,
  },
  {
    id: 5,
    title: "15-Minute Steak Tacos",
    purine: 98,
    time: 15,
    tags: ["steak"] as const,
    energy: "low" as const,
  },
  {
    id: 6,
    title: "Dark Chocolate Cherry Bark",
    purine: 34,
    time: 8,
    tags: ["sweet"] as const,
    energy: "low" as const,
  },
] as const;

export type Recipe = typeof recipes[number];
