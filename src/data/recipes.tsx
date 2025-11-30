// src/data/recipes.ts
export const recipes = [
  {
    id: 1,
    title: "Reverse-Seared Ribeye with Garlic Butter",
    purine: 89,
    time: 35,
    tags: ["steak"],
    energy: "high",
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta",
    purine: 67,
    time: 18,
    tags: ["pasta"],
    energy: "low",
  },
  {
    id: 3,
    title: "Cherry Bomb Chocolate Mousse",
    purine: 23,
    time: 10,
    tags: ["sweet"],
    energy: "low",
  },
  {
    id: 4,
    title: "Thai Green Curry (Low-Purine)",
    purine: 112,
    time: 30,
    tags: ["curry"],
    energy: "high",
  },
  {
    id: 5,
    title: "15-Minute Steak Tacos",
    purine: 98,
    time: 15,
    tags: ["steak"],
    energy: "low",
  },
  {
    id: 6,
    title: "Dark Chocolate Cherry Bark",
    purine: 34,
    time: 8,
    tags: ["sweet"],
    energy: "low",
  },
];

// Simple type – no more "6 elements required" nonsense
export type Recipe = typeof recipes[number];