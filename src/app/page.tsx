// src/app/page.tsx
import Image from "next/image";
import { Calculator } from "@/components/calculator";
import { RecipeCard } from "@/components/recipe-card";
import { RecipeList } from "@/components/recipe-list";
import { recipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-beige">
      {/* HERO — Personal & Trust-Building */}
      <section className="bg-emerald-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Delicious Recipes That<br />
            <span className="text-coral">Actually Lower Uric Acid</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto mt-12">
            <div className="bg-white/20 backdrop-blur rounded-full w-48 h-48 overflow-hidden ring-8 ring-white/30">
              <Image
                src="/jonathan.jpg"
                alt="Jonathan Kelly"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-left max-w-lg">
              <p className="text-xl md:text-2xl leading-relaxed">
                I’m Jonathan Kelly. After my first brutal gout flare in November 2025,{" "}
                <strong className="text-coral">
                  I refused to live on boiled chicken and sadness
                </strong>
                .<br /><br />
                These are the exact meals that keep me <strong className="text-coral">100 % flare-free</strong> — and still taste incredible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR — Instant Value */}
      <section className="py-20 bg-gradient-to-b from-beige to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-12">
            Find Your Perfect Gout-Safe Meal in 10 Seconds
          </h2>
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-emerald-100">
            <Calculator />
          </div>
        </div>
      </section>

      {/* PREVIEW RECIPES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            Some of the 50+ Recipes You’ll Unlock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — Big, Beautiful, Confident */}
 <section className="py-24 bg-gradient-to-b from-white to-beige">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-emerald-600">
      <h2 className="text-5xl font-black text-charcoal mb-8">
        50 Gout-Safe Recipes Pack
      </h2>

      <p className="text-2xl text-charcoal mb-10 leading-relaxed">
        Restaurant-quality meals • All under 300 mg purines • Shopping lists •
        20-minute versions • Cherry Bomb desserts • Lifetime updates
      </p>

      <div className="text-7xl font-black text-coral mb-10">$37</div>

      {/* --- Replacing <Button> with pure HTML link --- */}
      <div className="mt-10">
        <a
          href="https://buy.stripe.com/your-link-here"
          className="inline-flex items-center justify-center w-full h-14 px-12 text-2xl font-bold text-white bg-emerald-600 rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          Download Instantly – Lifetime Access
        </a>
      </div>

      <p className="text-sm text-charcoal/70 mt-8">
        127+ gout sufferers already flare-free • Instant PDF download •
        60-day money-back guarantee
      </p>
    </div>
  </div>
</section>

      <footer className="bg-charcoal text-beige py-8 text-center">
        <p>© 2025 RecipesForGout • Not medical advice • Made with stubborn hope in the UK</p>
      </footer>
    </main>
  );
}