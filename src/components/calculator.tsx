// src/components/calculator.tsx
"use client";

import { useState } from "react";
import { RecipeList } from "./recipe-list";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "./recipe-card";

export function Calculator() {
  const [craving, setCraving] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState("");

  const filtered = recipes.filter((r) => {
    if (craving && !(r.tags as readonly string[]).includes(craving)) return false;
    if (time === "20" && r.time > 20) return false;
    if (time === "40" && r.time > 40) return false;
    if (energy === "low" && r.energy !== "low") return false;
    if (energy === "high" && r.energy !== "high") return false;
    return true;
  });

  const hasFilters = !!craving || !!time || !!energy;

  return (
    <div className="w-full max-w-4xl mx-auto">   {/* ← THIS LINE IS THE ENTIRE FIX */}
      <div className="grid gap-8 mb-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Craving */}
          <div>
            <label className="block text-lg font-medium mb-3 text-charcoal">Craving?</label>
            <select
              value={craving}
              onChange={(e) => setCraving(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white text-charcoal border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none transition-all"
            >
              <option value="">Anything</option>
              <option value="steak">Steak</option>
              <option value="pasta">Pasta</option>
              <option value="curry">Curry</option>
              <option value="sweet">Sweet</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-lg font-medium mb-3 text-charcoal">Time?</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white text-charcoal border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none transition-all"
            >
              <option value="">No rush</option>
              <option value="20">Under 20 min</option>
              <option value="40">Under 40 min</option>
            </select>
          </div>

          {/* Energy */}
          <div>
            <label className="block text-lg font-medium mb-3 text-charcoal">Energy?</label>
            <select
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white text-charcoal border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none transition-all"
            >
              <option value="">Any</option>
              <option value="low">Knackered</option>
              <option value="high">Got energy</option>
            </select>
          </div>
        </div>

       {hasFilters ? (
  <>
    <p className="text-2xl font-bold text-emerald-700 text-center mb-12">
      Your perfect gout-safe meal:
    </p>
    {filtered.map((recipe) => (
      <div key={recipe.id} className="mb-20 last:mb-0">   {/* ← THIS IS ALL YOU NEED */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <RecipeCard recipe={recipe} />
          </div>
        </div>
      </div>
    ))}
  </>
) : (
  <p className="text-center text-xl text-charcoal/70 mt-8">
    Pick one or more options above → instant results
  </p>
)}
      </div>
    </div>
  );
}