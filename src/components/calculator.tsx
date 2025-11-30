"use client";

import { useState } from "react";
import { RecipeList } from "./recipe-list";
import { recipes } from "@/data/recipes";

export function Calculator() {
  const [craving, setCraving] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState("");

  const filtered = recipes.filter((r) => {
    if (craving && !r.tags.includes(craving)) return false;
    if (time === "20" && r.time > 20) return false;
    if (time === "40" && r.time > 40) return false;
    if (energy === "low" && r.energy !== "low") return false;
    if (energy === "high" && r.energy !== "high") return false;
    return true;
  });

  const hasFilters = craving || time || energy;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="block text-lg font-medium mb-3">Craving?</label>
          <select value={craving} onChange={(e) => setCraving(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-amber-400 focus:outline-none">
            <option value="">Anything</option>
            <option value="steak">Steak</option>
            <option value="pasta">Pasta</option>
            <option value="curry">Curry</option>
            <option value="sweet">Sweet</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium mb-3">Time?</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-amber-400 focus:outline-none">
            <option value="">No rush</option>
            <option value="20">Under 20 min</option>
            <option value="40">Under 40 min</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium mb-3">Energy?</label>
          <select value={energy} onChange={(e) => setEnergy(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-amber-400 focus:outline-none">
            <option value="">Any</option>
            <option value="low">Knackered</option>
            <option value="high">Got energy</option>
          </select>
        </div>
      </div>

      {hasFilters ? (
        <>
          <p className="text-2xl font-bold text-amber-300 text-center mb-8">Your perfect gout-safe meal:</p>
          <RecipeList recipes={filtered.slice(0, 6)} />
        </>
      ) : (
        <p className="text-center text-xl text-slate-300">Pick one or more options above → instant results</p>
      )}
    </div>
  );
}