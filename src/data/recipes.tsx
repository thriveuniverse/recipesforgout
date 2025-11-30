// src/data/recipes.ts
export const recipes = [
  {
    id: 1,
    title: "Reverse-Seared Ribeye with Garlic Butter",
    purine: 89,
    time: 35,
    tags: ["steak", "keto"],
    energy: "high",
    image: "/ribeye.jpg",
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta (No Anchovies!)",
    purine: 67,
    time: 18,
    tags: ["pasta", "vegetarian"],
    energy: "low",
    image: "/pasta.jpg",
  },
  {
    id: 3,
    title: "Cherry Bomb Chocolate Mousse",
    purine: 23,
    time: 10,
    tags: ["sweet", "dessert"],
    energy: "low",
    image: "/mousse.jpg",
  },
  // add 20–30 more later – 3 is enough to make everything compile
] as const;